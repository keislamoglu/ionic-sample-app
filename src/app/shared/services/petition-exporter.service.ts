import {Injectable} from '@angular/core';
import {
    GorusmelerinYapilamadiginaDairTutanak,
    GorusmeyeDavet,
    KovusturmaOlumluUzlastirmaRaporu,
    KovusturmaOlumsuzUzlastirmaRaporu,
    KovusturmaUzlastirmaciGorusmeTutanagi,
    SegbisGorusmeTalep,
    SorusturmaOlumluUzlastirmaRaporu,
    SorusturmaOlumsuzUzlastirmaRaporu,
    SorusturmaUzlastirmaciGorusmeTutanagi,
    TalimatYazisiTalep,
    TesimVeMasrafBelgesi, UzlasmaTeklifFormu
} from '../../templates';
import {ServicesModule} from './services.module';
import {DocxFileService} from './docx-file.service';
import {UserService} from './user.service';
import {TemplateDocument} from '../constants';
import {InstantiatorService} from './instantiator.service';

@Injectable({providedIn: ServicesModule})
export class PetitionExporterService {

    constructor(private _userService: UserService,
                private _instantiator: InstantiatorService,
                private _docxFileService: DocxFileService) {
    }

    async export(petitionId: string, extraData?: any) {
        const petition = await this._instantiator.instantiatePetition(petitionId);
        const docxTemplate = {
            [TemplateDocument.UzlasmaTeklifFormu]: UzlasmaTeklifFormu,
            [TemplateDocument.UzlasmaGorusmesineDavet]: GorusmeyeDavet,
            [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalep,
            [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagi,
            [TemplateDocument.KovusturmaOlumluUzlastirmaRaporu]: KovusturmaOlumluUzlastirmaRaporu,
            [TemplateDocument.KovusturmaOlumsuzUzlastirmaRaporu]: KovusturmaOlumsuzUzlastirmaRaporu,
            [TemplateDocument.SorusturmaOlumluUzlastirmaRaporu]: SorusturmaOlumluUzlastirmaRaporu,
            [TemplateDocument.SorusturmaOlumsuzUzlastirmaRaporu]: SorusturmaOlumsuzUzlastirmaRaporu,
            [TemplateDocument.SorusturmaUzlastirmaciGorusmeTutanagi]: SorusturmaUzlastirmaciGorusmeTutanagi,
            [TemplateDocument.TalimatYazisiTalep]: TalimatYazisiTalep,
            [TemplateDocument.TesimVeMasrafBelgesi]: TesimVeMasrafBelgesi,
            [TemplateDocument.GorusmelerinYapilamadiginaDairTutanak]: GorusmelerinYapilamadiginaDairTutanak,
        }[petition.template.slugName];

        return this._docxFileService.export({
            fileName: petition.fileName,
            docxTemplate,
            props: {petition, extraData, conciliator: this._userService.currentUser}
        });
    }
}
