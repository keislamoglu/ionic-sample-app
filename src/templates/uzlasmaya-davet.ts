import {Document, Paragraph, Packer, TextRun} from 'docx';
import {Person, ProsecutionOffice, UserInfo} from '../app/shared/entity';
import {DocxFileTemplate} from './docx-file-template';

export interface UzlasmayaDavetProps {
    claiment: Person;
    defendant: Person;
    prosecutionOffice: ProsecutionOffice;
    date: Date;
    userInfo: UserInfo;
}

export class UzlasmayaDavet implements DocxFileTemplate {
    private document = new Document();

    constructor(private props: UzlasmayaDavetProps) {
        this.addP('Uzlaşmaya davet mektubu');
        this.addP('');
        this.addP(this.fullName(props.claiment));
    }

    private addP(text: string) {
        this.document.addParagraph(new Paragraph(text));
    }

    private fullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }

    getDocument() {
        return this.document;
    }
}
