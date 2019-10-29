import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {UserService} from './user.service';
import {TemplateDocument} from '../constants';
import {InstantiatorService} from './instantiator.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {BaseTemplate, UzlasmaTeklifFormu} from '../../templates/pdf';
import {File} from '@ionic-native/file/ngx';
import {AppConfig} from '../app-config';

@Injectable({providedIn: ServicesModule})
export class PetitionExporterService {

    private get _savePath() {
        return this._file.documentsDirectory + AppConfig.DocumentsDirectory;
    }

    constructor(private _userService: UserService,
                private _instantiator: InstantiatorService,
                private _file: File) {
    }

    async export(petitionId: string) {
        const petition = await this._instantiator.instantiatePetition(petitionId);

        const template = {
            [TemplateDocument.UzlasmaTeklifFormu]: UzlasmaTeklifFormu,
            // [TemplateDocument.UzlasmaGorusmesineDavet]: GorusmeyeDavet,
            // [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalep,
            // [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagi,
            // [TemplateDocument.KovusturmaOlumluUzlastirmaRaporu]: KovusturmaOlumluUzlastirmaRaporu,
            // [TemplateDocument.KovusturmaOlumsuzUzlastirmaRaporu]: KovusturmaOlumsuzUzlastirmaRaporu,
            // [TemplateDocument.SorusturmaOlumluUzlastirmaRaporu]: SorusturmaOlumluUzlastirmaRaporu,
            // [TemplateDocument.SorusturmaOlumsuzUzlastirmaRaporu]: SorusturmaOlumsuzUzlastirmaRaporu,
            // [TemplateDocument.SorusturmaUzlastirmaciGorusmeTutanagi]: SorusturmaUzlastirmaciGorusmeTutanagi,
            // [TemplateDocument.TalimatYazisiTalep]: TalimatYazisiTalep,
            // [TemplateDocument.TesimVeMasrafBelgesi]: TesimVeMasrafBelgesi,
            // [TemplateDocument.GorusmelerinYapilamadiginaDairTutanak]: GorusmelerinYapilamadiginaDairTutanak,
        }[petition.template.slugName];

        const props = {
            petition,
            extraData: JSON.parse(petition.extraData),
            conciliator: this._userService.currentUser
        };
        const blob = await this._createBlob(this._getDocumentDefinition(template, props));

        return this.saveFile(petition.fileName, blob);
    }

    async saveFile(fileName: string, blob: Blob) {
        this._createDocsDirIfNotExists();

        return this._file.writeFile(
            this._savePath,
            `${fileName}.pdf`,
            blob,
            {replace: true}
        );
    }

    private _createDocsDirIfNotExists() {
        return this._file.createDir(this._file.documentsDirectory, AppConfig.DocumentsDirectory, false);
    }

    private _getDocumentDefinition(template: (new (...args: any[]) => any), props?: {}) {
        const instance: BaseTemplate<any> = Object.create(template.prototype);
        instance.constructor.apply(instance, [props]);
        return instance.documentDefinition;
    }

    private _createBlob(documentDefinition: any): Promise<Blob> {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        return new Promise((resolve, reject) => {
            try {
                pdfMake.createPdf(documentDefinition).getBlob(blob => {
                    resolve(blob);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
