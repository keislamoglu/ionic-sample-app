import {Injectable} from '@angular/core';
import {CaseFile, CompetentAuthority, Party, Person, Petition, PetitionTemplate, TemplateDocument, UserInfo} from '../entity';
import {GorusmeyeDavet, GorusmeyeDavetProps} from '../../../templates';
import {map, switchMap} from 'rxjs/operators';
import {ServicesModule} from './services.module';
import {PetitionService} from './petition.service';
import {PetitionTemplateService} from './petition-template.service';
import {PartyService} from './party.service';
import {DocxFileService} from './docx-file.service';
import {PersonService} from './person.service';
import {CaseFileService} from './case-file.service';
import {CompetentAuthorityService} from './competent-authority.service';
import {UserInfoService} from './user-info.service';


@Injectable({providedIn: ServicesModule})
export class PetitionExporterService {

    constructor(private _petitionService: PetitionService,
                private _petitionTemplateService: PetitionTemplateService,
                private _userInfoService: UserInfoService,
                private _caseFileService: CaseFileService,
                private _partyService: PartyService,
                private _personService: PersonService,
                private _competentAuthorityService: CompetentAuthorityService,
                private _docxFileService: DocxFileService) {
    }

    async export(petitionId: string) {
        const petition: Petition = await this._getPetition(petitionId);
        const template = await this._getTemplate(petition.templateId);
        const party = await this._getParty(petition.partyId);
        const person = await this._getPerson(party.personId);
        const caseFile = await this._getCaseFile(party.caseFileId);
        const competentAuthority = await this._getCompetentAuthority(caseFile.competentAuthorityId);

        const userInfo: UserInfo = await this._getUserInfo();

        switch (template.slugName) {
            case TemplateDocument.UzlasmaGorusmesineDavet:
                this._docxFileService.export({
                    fileName: petition.fileName,
                    docxTemplate: GorusmeyeDavet,
                    props: {
                        date: petition.date,
                        person,
                        caseFile,
                        competentAuthority,
                        userInfo
                    } as GorusmeyeDavetProps
                });
                break;
        }
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

    private _getUserInfo(): Promise<UserInfo> {
        return this._userInfoService.getAll().pipe(map(users => users[0])).toPromise();
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
