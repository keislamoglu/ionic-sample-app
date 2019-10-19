import {Injectable} from '@angular/core';
import {
    AddressService,
    AttorneyGeneralshipService,
    CaseFileService,
    CityService,
    CourtHouseService, ExtensionTimeService,
    PartyService,
    PersonService,
    PetitionService,
    PetitionTemplateService
} from '../repositories';
import {Petition} from '../entity';

@Injectable({providedIn: 'root'})
export class InstantiatorService {
    constructor(
        private caseFileService: CaseFileService,
        private partyService: PartyService,
        private personService: PersonService,
        private petitionService: PetitionService,
        private petitionTemplateService: PetitionTemplateService,
        private attorneyGeneralshipService: AttorneyGeneralshipService,
        private courtHouseService: CourtHouseService,
        private addressService: AddressService,
        private cityService: CityService,
        private extensionTimeService: ExtensionTimeService,
    ) {
    }

    async instantiatePetition(petitionId: string): Promise<Petition> {
        const petition = await this.petitionService.get(petitionId).toPromise();
        petition.caseFile = await this.instantiateCaseFile(petition.caseFileId);
        [
            petition.parties,
            petition.template
        ] = await Promise.all([
            Promise.all(petition.partyIds.map(id => this.instantiateParty(id))),
            this.petitionTemplateService.get(petition.templateId).toPromise(),
        ]);

        return petition;
    }

    async instantiateCaseFile(caseFileId: string) {
        const caseFile = await this.caseFileService.get(caseFileId).toPromise();
        [
            caseFile.courtHouse,
            caseFile.attorneyGeneralship,
            caseFile.parties,
            caseFile.extensionTimes
        ] = await Promise.all([
            this.courtHouseService.get(caseFile.courtHouseId).toPromise(),
            this.attorneyGeneralshipService.get(caseFile.attorneyGeneralshipId).toPromise(),
            Promise.all((await this.partyService.getByCaseFile(caseFileId).toPromise()).map(t => this.instantiateParty(t.id))),
            this.extensionTimeService.getByCaseFile(caseFileId).toPromise(),
        ]);

        return caseFile;
    }

    async instantiateParty(partyId: string) {
        const party = await this.partyService.get(partyId).toPromise();
        [
            party.person,
            party.relatedPerson
        ] = await Promise.all([
            this.instantiatePerson(party.personId),
            this.instantiatePerson(party.relatedPersonId)
        ]);

        return party;
    }

    async instantiatePerson(personId: string) {
        const person = await this.personService.get(personId).toPromise();
        [person.address, person.mernisAddress] = await Promise.all([
            this.instantiateAddress(person.addressId),
            this.instantiateAddress(person.mernisAddressId)
        ]);

        return person;
    }

    async instantiateAddress(addressId: string) {
        const address = await this.addressService.get(addressId).toPromise();
        address.city = await this.cityService.get(address.cityId).toPromise();

        return address;
    }
}
