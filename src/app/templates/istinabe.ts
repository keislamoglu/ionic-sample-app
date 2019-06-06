import {CaseFile, ClientUser, CompetentAuthority, Person} from '../shared/entity';
import {BaseTemplate, TextAlign} from './base';

export interface IstinabeProps {
    caseFile: CaseFile;
    person: Person;
    competentAuthority: CompetentAuthority;
    user: ClientUser;
}

export class Istinabe extends BaseTemplate<IstinabeProps> {
    protected prepareDocument(props: IstinabeProps) {
        this.addText(`${props.competentAuthority.name} UZLAŞMA BÜROSU'NA`, TextAlign.Center);
        this.newLine();
        this.addText(`${props.caseFile.conciliationNo} sayılı
         uzlaşma dosyasında ${this.fullName(props.person)}`, TextAlign.Justified);
        this.newLine();
        this.newLine();
        this.addText('UZLAŞTIRMACI', TextAlign.Right);
        this.addText(this.fullName(props.user), TextAlign.Right);
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
