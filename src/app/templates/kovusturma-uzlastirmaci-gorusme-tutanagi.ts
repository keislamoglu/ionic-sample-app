import {BaseTemplate, TextAlign} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Party, Person} from '../shared/entity';
import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';

export interface KovusturmaUzlastirmaciGorusmeTutanagiProps {
    user: ClientUser;
    person: Person;
    party: Party;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    extraData: {
        firstDate: string,
        secondDate: string,
        mustekiName: string
    };
}

export const KovusturmaUzlastirmaciGorusmeTutanagiQuestions: Question[] = [
    new DateQuestion({
        required: true,
        label: 'Uzlaşma tarihi',
        key: 'firstDate',
        format: 'DD/MM/YYYY',
    }),
    new TextboxQuestion({
        label: 'Müşteki adı',
        key: 'mustekiName',
        required: true,
    })
];

export class KovusturmaUzlastirmaciGorusmeTutanagi extends BaseTemplate {
    protected prepareDocument(props: KovusturmaUzlastirmaciGorusmeTutanagiProps) {
        this.addText('UZLAŞTIRMACI GÖRÜŞME TUTANAĞI', TextAlign.Center).underline();
        this.newLine();
        this.addText('Uzlaştırma No: ' + props.caseFile.conciliationNo).bold();
        this.newLine();
        const p1 = this.createP();
        this.addText('5271 sayılı Ceza Muhakemesi Kanununun 253. ve 254. maddeleri gereğince' +
            props.competentAuthority.name + 'Cumhuriyet Başsavcılığı Uzlaştırma Bürosu’nun ' +
            new Date(props.extraData.firstDate).toLocaleTimeString() + '');
    }
}
