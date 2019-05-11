import {CaseFile, CompetentAuthority, Person, ClientUser} from '../app/shared/entity';
import {DocxFileTemplate, TextAlign} from './docx-file-template';

export interface IstinabeProps {
    caseFile: CaseFile;
    person: Person;
    competentAuthority: CompetentAuthority;
    user: ClientUser;
}

export class Istinabe extends DocxFileTemplate<IstinabeProps> {
    protected prepareDocument() {
        this.addText(`${this.props.competentAuthority.name} UZLAŞMA BÜROSU'NA`, TextAlign.Center);
        this.newLine();
        this.addText(`${this.props.caseFile.conciliationNo} sayılı
         uzlaşma dosyasında ${this.fullName(this.props.person)}`, TextAlign.Justified);
        this.newLine();
        this.newLine();
        this.addText('UZLAŞTIRMACI', TextAlign.Right);
        this.addText(this.fullName(this.props.user), TextAlign.Right);
        this.newLine();
        this.newLine();
        this.newLine();
        this.newLine();
        this.addText('EKİ: Uzlaşma teklif formu');
        this.addText('Uzlaştırma raporu', TextAlign.Left);
    }

    private fullName(person: Person | ClientUser) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
