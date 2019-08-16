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
        this.text(`${props.competentAuthority.name} UZLAŞMA BÜROSU'NA`, TextAlign.Center);
        this.newLine();
        this.text(`${props.caseFile.conciliationNo} sayılı
         uzlaşma dosyasında ${this.fullName(props.person)}`, TextAlign.Justified);
        this.newLine();
        this.newLine();
        this.text('UZLAŞTIRMACI', TextAlign.Right);
        this.text(this.fullName(props.user), TextAlign.Right);
        this.newLine();
        this.newLine();
        this.newLine();
        this.newLine();
        this.text('EKİ: Uzlaşma teklif formu');
        this.text('Uzlaştırma raporu', TextAlign.Left);
    }

    private fullName(person: Person | ClientUser) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
