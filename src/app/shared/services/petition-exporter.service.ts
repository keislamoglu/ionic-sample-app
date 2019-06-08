import {Injectable} from '@angular/core';
import {
    Address,
    CaseFile,
    City,
    ClientUser,
    CompetentAuthority,
    Party,
    Person,
    Petition,
    PetitionTemplate,
    TemplateDocument
} from '../entity';
import {
    GorusmeyeDavet,
    GorusmeyeDavetProps,
    Istinabe,
    IstinabeProps,
    KovusturmaUzlasmaTeklif,
    KovusturmaUzlasmaTeklifProps,
    KovusturmaUzlastirmaciGorusmeTutanagi,
    KovusturmaUzlastirmaciGorusmeTutanagiProps,
    SegbisGorusmeTalep,
    SegbisGorusmeTalepProps
} from '../../templates';
import {switchMap} from 'rxjs/operators';
import {ServicesModule} from './services.module';
import {
    AddressService,
    CaseFileService, CityService,
    CompetentAuthorityService,
    PartyService,
    PersonService,
    PetitionService,
    PetitionTemplateService,
} from '../repositories';
import {DocxFileService} from './docx-file.service';
import {UserService} from './user.service';


@Injectable({providedIn: ServicesModule})
export class PetitionExporterService {

    constructor(private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _userService: UserService,
                private _caseFileService: CaseFileService,
                private _partyService: PartyService,
                private _personService: PersonService,
                private _competentAuthorityService: CompetentAuthorityService,
                private _addressService: AddressService,
                private _cityService: CityService,
                private _docxFileService: DocxFileService) {
    }

    async export(petitionId: string, extraData?: any) {
        const petition: Petition = await this._getPetition(petitionId);
        const template = await this._getTemplate(petition.templateId);
        const party = await this._getParty(petition.partyId);
        const person = await this._getPerson(party.personId);
        const caseFile = await this._getCaseFile(party.caseFileId);
        const competentAuthority = await this._getCompetentAuthority(caseFile.competentAuthorityId);
        const personAddress = await this._getAddress(person.addressId);
        const personCity = await this._getCity(personAddress.cityId);

        const user: ClientUser = await this._getUser();
        let props = {};
        let docxTemplate;
        switch (template.slugName) {
            case TemplateDocument.UzlasmaGorusmesineDavet:
                docxTemplate = GorusmeyeDavet;
                props = <GorusmeyeDavetProps>{
                    date: petition.date,
                    caseFile,
                    person,
                    competentAuthority,
                    user
                };
                break;
            case TemplateDocument.Istinabe:
                docxTemplate = Istinabe;
                props = <IstinabeProps>{
                    caseFile,
                    competentAuthority,
                    person,
                    user
                };
                break;
            case TemplateDocument.KovusturmaUzlasmaTeklif:
                docxTemplate = KovusturmaUzlasmaTeklif;
                props = <KovusturmaUzlasmaTeklifProps>{
                    caseFile,
                    competentAuthority,
                    party,
                    person,
                    user,
                    personAddress,
                    personCity,
                    extraData
                };
                break;
            case TemplateDocument.SegbisGorusmeTalep:
                docxTemplate = SegbisGorusmeTalep;
                props = <SegbisGorusmeTalepProps>{
                    extraData,
                    caseFile,
                    competentAuthority,
                    date: new Date().toString(),
                    person,
                    user
                };
                break;
            case TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi:
                docxTemplate = KovusturmaUzlastirmaciGorusmeTutanagi;
                props = <KovusturmaUzlastirmaciGorusmeTutanagiProps>{
                    user,
                    competentAuthority,
                    caseFile,
                    party,
                    person,
                    extraData,
                };
                break;
        }
        this._docxFileService.export({
            fileName: petition.fileName,
            docxTemplate,
            props
        });
    }

    private _getPetition(id: string): Promise<Petition> {
        return this._petitionService.get(id).toPromise();
    }

    private _getTemplate(id: string): Promise<PetitionTemplate> {
        return this._petitionTemplateService.get(id).toPromise();
    }

    private _getParty(id: string): Promise<Party> {
        return this._partyService.get(id).toPromise();
    }

    private _getPerson(id: string): Promise<Person> {
        return this._personService.get(id).toPromise();
    }

    private _getCaseFile(id: string): Promise<CaseFile> {
        return this._caseFileService.get(id).toPromise();
    }

    private _getCompetentAuthority(id: string): Promise<CompetentAuthority> {
        return this._competentAuthorityService.get(id).toPromise();
    }

    private _getUser(): ClientUser {
        return this._userService.currentUser;
    }

    private _getAddress(id: string): Promise<Address> {
        return this._addressService.get(id).toPromise();
    }

    private _getCity(id: string): Promise<City> {
        return this._cityService.get(id).toPromise();
    }

    private _getCaseFileParties(caseFileId: string) {
        return this._partyService.getByCaseFile(caseFileId).toPromise();
    }

    private _getCaseFilePersons(caseFileId: string) {
        return this._partyService.getByCaseFile(caseFileId).pipe(
            switchMap(parties => {
                return parties.map(party => this._personService.get(party.personId));
            })
        ).toPromise();
    }
}
