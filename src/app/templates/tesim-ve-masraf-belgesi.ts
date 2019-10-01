import {CaseFile, ClientUser, CompetentAuthority} from '../shared/entity';
import {BaseTemplate, TextAlign} from './base';
import {Condition, DateQuestion, DropdownQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {PersonService} from '../shared/repositories';

const defaultBank = 'Ziraat Bankası / 42-502417-1 / TR69 0020 9000 0050 2417 0000 01';

export interface TesimVeMasrafBelgesiProps {
    competentAuthority: CompetentAuthority;
    caseFile: CaseFile;
    user: ClientUser;
    extraData: {
        date: string,
        bank: string,
        otherBank: string,
        recipient: string,
        costLabel1: string,
        costLabel2: string,
        costLabel3: string,
        costLabel4: string,
        costLabel5: string,
        cost1: string,
        cost2: string,
        cost3: string,
        cost4: string,
        cost5: string
    };
}
const costQuestions = [];

new Array(5).fill(null).forEach((v, i) => {
    const no = i + 1;
    const conditions = no === 1 ? [] : [{question: `costLabel${no - 1}`, condition: Condition.IsNotNull}];
    costQuestions.push(...[
        new TextboxQuestion({
            key: `costLabel${no}`,
            label: `Masraf kalemi`,
            conditions
        }),
        new TextboxQuestion({
            key: `cost${no}`,
            label: `Masraf bedeli`,
            conditions
        }),
    ]);
});

export const TesimVeMasrafBelgesiQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true,
    }),
    new DropdownQuestion({
        key: 'bank',
        label: 'Banka',
        value: defaultBank,
        options: [
            {
                key: defaultBank,
                value: defaultBank
            },
            {
                key: '',
                value: 'Diğer'
            }
        ],
        required: false,
    }),
    new TextboxQuestion({
        key: 'otherBank',
        label: 'Diğer Banka (Banka Adı / Hesap No / IBAN)',
        conditions: [{
            question: 'bank',
            condition: Condition.IsEmpty
        }],
        required: false
    }),
    new TextboxQuestion({
        key: 'recipient',
        label: 'Dilekçeyi teslim alan',
        required: true
    }),
    ...costQuestions
];

export class TesimVeMasrafBelgesi extends BaseTemplate<TesimVeMasrafBelgesiProps> {
    protected prepareDocument(props: TesimVeMasrafBelgesiProps) {
        const {caseFile, user, competentAuthority, extraData} = props;
        this.text('TESİM VE MASRAF BELGESİ', TextAlign.Center).bold().underline();
        this.text(competentAuthority.name + ' CUMHURİYET BAŞSAVCILIĞI', TextAlign.Center).bold();
        this.text('(Uzlaştırma Bürosu)').bold();
        this.text(['Uzlaştırma No: ', caseFile.conciliationNo]).bold();
        this.indentedText(`Yukarıda uzlaştırma numarası yazılı dosya kapsamında;`);
        this.indentedText([
            `Uzlaştırma süreci esnasında yapmış olduğum ve aşağıda masraf türü ile masraf gideri yazılı`,
            ` uzlaştırmacı giderlerimin Ceza Muhakemesinde Uzlaştırma Yönetmeliği'nin 38. maddesine`,
            ` göre uzlaştırmacı ücretine ilaveten ödenmesi için iş bu masraf belgesi düzenlenmiş olup,`,
            ` gereğinin takdiri saygılarımla arz olunur. `,
            this.printDate(extraData.date)
        ]);
        this.text(PersonService.FullName(user), TextAlign.Right);
        this.text(user.registrationNo, TextAlign.Right);
        this.text('Uzlaştırmacı', TextAlign.Right);
        this.newLine();
        this.text('Uzlaştırmacı Bilgileri:');

        const [bankName, accountNo, iban] = (extraData.bank || extraData.otherBank).split('/').map(t => t.trim());
        this.printLabelValue([
            ['Ad Soyad', PersonService.FullName(user)],
            ['Adres', user.address],
            ['Telefon', user.phone],
            ['Banka', bankName],
            ['Hesap No', accountNo],
            ['İban', iban]
        ]);
        this.newLine();
        this.text('MASRAFLAR').bold();
        const p1 = this.createParagraph();
        const costs = [];
        let totalCost = 0;
        let costUnit = '';
        const parseCostUnit = (cost: string) => {
            const [, _unit] = cost.match(/\d\s*(\w+)$/);
            return _unit || 'TL';
        };
        const parseCost = (cost: string, unit: string) => {
            return +cost.replace(new RegExp(`\\s*${unit}`), '');
        };
        new Array(5).fill(null).forEach((v, i) => {
            const no = i + 1;
            const label = extraData[`costLabel${no}`];
            const cost = extraData[`cost${no}`];
            if (label) {
                costs.push([label, cost]);
                if (!costUnit) {
                    costUnit = parseCostUnit(cost);
                }
                totalCost += parseCost(cost, costUnit);
            }
        });
        this.printLikeTable([
            ['Masraf Türü', 'Masraf Gideri'],
            ...costs,
            ['TOPLAM', `${totalCost} ${costUnit}`]
        ]);
        this.newLine();
        this.text(`Teslim Alan: ${extraData.recipient}`);
    }
}

