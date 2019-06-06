import {BaseTemplate, TextAlign} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Person} from '../shared/entity';
import {PersonService} from '../shared/repositories';
import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';

export interface SegbisGorusmeTalepExtraData {
    jailType: string;
    requestDate: string;
}

export interface SegbisGorusmeTalepProps {
    user: ClientUser;
    caseFile: CaseFile;
    person: Person;
    extraData: SegbisGorusmeTalepExtraData;
    competentAuthority: CompetentAuthority;
    date: string;
}

export const SegbisGorusmeTalepQuestions: Question[] = [
    new TextboxQuestion({
        key: 'jailType',
        label: 'Ceza evi tipi',
        required: true,
    }),
    new DateQuestion({
        key: 'requestDate',
        format: 'DD/MM/YYYY HH:mm',
        label: 'Görüşme talep tarihi',
        required: true
    })
];

export class SegbisGorusmeTalep extends BaseTemplate<SegbisGorusmeTalepProps> {

    protected prepareDocument() {
        const props = this.props;
        this.addText(`${props.competentAuthority.name} CUMHURİYET BAŞSAVCILIĞINA`, TextAlign.Center).bold();
        this.addText(`(Uzlaştırma Bürosu)`, TextAlign.Center).bold();
        this.newLine(2);
        const p1 = this.createP();
        this.addText('Uzlaştırma No: ', p1).bold();
        this.addText(props.caseFile.conciliationNo);
        this.newLine();
        this.addText(`Yukarıda uzlaştırma numarası yazılı dosya kapsamında;`);
        this.newLine();
        this.addText(props.extraData.jailType + ' Tipi Kapalı Ceza ve İnfaz Kurumunda bulunan tutuklu' + this.fullName(props.person) +
            '(TC: ' + props.person.nId + ') ile uzlaştırma görüşmeleri yapmak üzere ' + this.getDate(props.extraData.requestDate) +
            ' tarihinde saat ' + this.getHours(props.extraData.requestDate) + '\'de SEGBİS (Ses ve Görüntü Bilişim Sistemi)' +
            ' üzerinden görüşme yapmama izin verilmesi hususunda gereğinin takdiri arz olunur. ' +
            this.getDate(props.date), TextAlign.Justified);
        this.newLine(2);
        this.addText(this.fullName(props.user), TextAlign.Right);
        this.addText('Uzlaştırmacı', TextAlign.Right);
    }

    private fullName(person: Person | ClientUser) {
        return PersonService.FullName(person);
    }

    private getDate(dateString: string) {
        return new Date(dateString).toLocaleDateString();
    }

    private getHours(dateString: string) {
        return new Date(dateString).toLocaleTimeString();
    }
}
