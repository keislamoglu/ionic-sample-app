import {CaseFile, ClientUser, CompetentAuthority} from '../shared/entity';
import {BaseTemplate, TextAlign} from './base';
import {Comparison, DateQuestion, DropdownQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {PersonService} from '../shared/repositories';

export interface TesimVeMasrafBelgesiProps {
    competentAuthority: CompetentAuthority;
    caseFile: CaseFile;
    user: ClientUser;
    extraData: {
        date: string,
        bank: string,
        otherBank: string,
        recipient: string
    };
}

export const TesimVeMasrafBelgesiQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true,
    }),
    new DropdownQuestion({
        key: 'bank',
        label: 'Banka',
        options: [
            {
                key: 'Ziraat Bankası / 42-502417-1 / TR69 0020 9000 0050 2417 0000 01',
                value: 'Ziraat Bankası / 42-502417-1 / TR69 0020 9000 0050 2417 0000 01'
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
            comparison: Comparison.IsEmpty
        }],
        required: false
    }),
    new TextboxQuestion({
        key: 'recipient',
        label: 'Dilekçeyi teslim alan',
        required: true
    })
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
        this.text(user.sicilNumber, TextAlign.Right);
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
        this.printLikeTable([
            ['Masraf Türü', 'Masraf Gideri'],
            ['Yol Masrafı (Rayiç bedel) 3 Gidiş 3 Dönüş', '90,00 TL'],
            ['TOPLAM', '90,00 TL']
        ]);
        this.newLine();
        this.text(`Teslim Alan: ${extraData.recipient}`);
    }
}

