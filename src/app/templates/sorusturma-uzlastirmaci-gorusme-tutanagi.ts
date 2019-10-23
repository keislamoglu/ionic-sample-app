import {BaseTemplate, TextAlign} from './base';
import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {fullName} from '../shared/helpers';

export interface SorusturmaUzlastirmaciGorusmeTutanagiProps {
    date: string;
    callDate: string,
    courtHouse: string,
}

export const SorusturmaUzlastirmaciGorusmeTutanagiQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true
    }),
    new DateQuestion({
        key: 'callDate',
        label: 'Müştekinin arandığı/davet edildiği tarih',
        required: true
    }),
    new TextboxQuestion({
        key: 'courtHouse',
        label: 'Davet edilen adliye',
        required: true
    }),
    new TextboxQuestion({
        key: 'crimes',
        label: 'Suçlar',
        required: true
    })
];

export class SorusturmaUzlastirmaciGorusmeTutanagi extends BaseTemplate<SorusturmaUzlastirmaciGorusmeTutanagiProps> {
    protected prepareDocument() {
        /*const {
            competentAuthority,
            caseFile,
            user,
            person,
            extraData
        } = props;
        this.text('UZLAŞTIRMACI GÖRÜŞME TUTANAĞI', TextAlign.Center).bold().underline();

        const p1 = this.createParagraph();
        this.text('Uzlaştırma No: ', p1).bold();
        this.text(caseFile.conciliationNo, p1);

        const p2 = this.createParagraph();
        this.indentedText([
            `5271 sayılı Ceza Muhakemesi Kanununun 253. maddesi gereğince `,
            competentAuthority.name,
            ` Cumhuriyet Başsavcılığı Uzlaştırma Bürosu'nun `,
            `${this.printDate(caseFile.conciliationStartDate)} tarih ve ${caseFile.conciliationNo}`,
            ` uzlaştırma nolu yazısı ile talep edilen uzlaştırıcılık görevinde müşteki `,
            `${fullName(person)}, ${this.printDate(extraData.callDate)}`,
            ` tarihinde dosya içerisinde yer alan telefon numarasından aranarak `
        ], p2);
        this.text(`${extraData.courtHouse} Uzlaştırma Bürosu Görüşme Odasına`, p2);
        this.text(` davet edilmiş ve şahsın gelmesiyle uzlaştırma kapsamında görüşülmüş ve aşağıdaki tutanak tanzim edilmiştir.`, p2);

        this.newLine();

        this.text(`Uzlaşmaya davet edilen taraf: ${fullName(person)}`);
        this.text(`Uzlaştırmacı: ${fullName(user)}`);

        this.newLine();

        const p3 = this.createParagraph();
        this.indentedText('Müşteki', p3).bold();
        this.text([
            ` ile yapılan görüşmede uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve sonuçları anlatılmış;`,
            ` "uzlaşma sonucunda şüphelinin edimini def'aten yerine getirmesi halinde, şüpheli hakkında kovusturmaya`,
            ` yer olmadığı kararı verileceği, edimin yerine getirilmesinin ileri tarihe bırakılması, takside bağlanması`,
            ` veya süreklilik arzetmesi halinde, 171 inci madedeki şartlar aranmaksızın, şüpheli hakkında kamu`,
            ` davasının açılmayacağı; açılmış olan davadan feragat edilmiş sayıldığı, şüphelinin edimini yerine`,
            ` getirmemesi halinde uzlaşma raporu veya belgesinin 9/6/1932 tarihli ve 2004 sayılı İcra ve İflas Kanununun`,
            ` 38 inci maddesinde yazılı ilam mahiyetini haiz belgelerden sayıldığı" hususları hatırlatılmış olup;`,
            ` "${extraData.crimes}" suçu ilgili olarak `
        ], p3);
        this.text(`müştekinin uzlaşmayı hangi şartlar altında kabul edeceği`, p3).bold().underline();
        this.text(` sorulmuş, `, p3);
        this.text(`müşteki`, p3).bold();
        this.text(` söz alarak;`, p3);
        this.indentedText([
            `"Konu ile ilgili olarak daha önceden ayrıntılı olarak ifade vermiştim, o ifadem doğrudur, aynen tekrar ederim.`,
            ` Maddi-manevi hiçbir talebim olmaksızın uzlaşmak istiyorum."`
        ]);
        this.indentedText([
            `Şeklinde beyanda bulunmuş ve sözlü beyanı tarafımdan yazıya döküldükten sonra kendisine okunmuş ve doğruluğu`,
            ` tasdik olunmuş, Ceza Muhakemesinde Uzlaştırma Yönetmeliği hükümleri gereği uzlaşmanın hukukî sonuçları kendisine`,
            ` açıklanarak iş bu tutanak birlikte imza altına alınmıştır. ${this.printDate(extraData.date)}`
        ]);

        this.newLine();

        this.text(fullName(person));
        this.text(`Müşteki`);

        this.newLine();

        this.text(fullName(user));
        this.text(`Uzlaştırmacı`);*/
    }
}
