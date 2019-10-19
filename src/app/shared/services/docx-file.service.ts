import {Packer} from 'docx';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {DocxFileTemplate} from '../../templates';
import {BaseTemplateProps} from '../../templates/base';

export interface DocxFileExportOptions<T = {}> {
    fileName: string;
    docxTemplate: (new (...args: any[]) => any);
    props?: BaseTemplateProps<T>;
}

export const DIR_NAME = 'uzlastr';

@Injectable({providedIn: ServicesModule})
export class DocxFileService {
    constructor(private _file: File, private _fileOpener: FileOpener) {
    }

    async export<T>(options: DocxFileExportOptions<T>) {
        this._createDocsDirIfNotExists();
        return this._file.writeFile(
            this._getPath(),
            options.fileName,
            await this._createBlob(options.docxTemplate, options.props),
            {replace: true}
        );
    }

    open(fileName: string) {
        return this._fileOpener
            .open(this._getPath() + '/' + fileName,
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }

    private _createDocsDirIfNotExists() {
        this._file.createDir(this._file.documentsDirectory, DIR_NAME, false);
    }

    private _getPath() {
        return this._file.documentsDirectory + DIR_NAME;
    }

    private _createBlob(templateDocument: (new (...args: any[]) => any), props?: {}) {
        // @ts-ignore
        const instance: DocxFileTemplate = Object.create(templateDocument.prototype);
        instance.constructor.apply(instance, [props]);
        const docx = instance.getDocument();
        const packer = new Packer();
        return packer.toBlob(docx);
    }
}
