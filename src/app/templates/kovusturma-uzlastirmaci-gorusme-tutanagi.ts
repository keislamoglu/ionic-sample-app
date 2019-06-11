import {BaseTemplate, TextAlign} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Party, Person} from '../shared/entity';
import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import { PersonService } from '../shared/repositories/person.service';

export interface KovusturmaUzlastirmaciGorusmeTutanagiProps {
    user: ClientUser;
    person: Person;
    party: Party;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    extraData: {
        callDate: string,
        crimes: string,
        officialReportDate: string,
    };
}

export const KovusturmaUzlastirmaciGorusmeTutanagiQuestions: Question[] = [
    new DateQuestion({
        label: 'Tutanak Tarihi',
        key: 'officialReportDate',
        required: true
    }),
    new DateQuestion({
        label: 'Arama Tarihi',
        key: 'callDate',
        required: true
    }),
    new TextboxQuestion({
        label: 'Suç(lar)',
        key: 'crimes',
        required: true
    })
];

export class KovusturmaUzlastirmaciGorusmeTutanagi extends BaseTemplate {
    protected prepareDocument(props: KovusturmaUzlastirmaciGorusmeTutanagiProps) {
        const {caseFile, user, person, competentAuthority, extraData, party} = props;
        this.addText('UZLAŞTIRMACI GÖRÜŞME TUTANAĞI', TextAlign.Center).bold().underline();
        this.newLine();
        const p1 = this.createP();
        this.addText('Uzlaştırm No: ', p1).bold();
        this.addText(caseFile.conciliationNo, p1);
        const p2 = this.createP();
        this.addText([
            '5271 sayılı Ceza Muhakemesi Kanununun 253. ve 254. maddeleri gereğince ',
            competentAuthority.name,
            ' Cumhuriyet Başsavcılığı Uzlaştırma Bürosu’nun ',
            this.printDate(caseFile.conciliationStartDate), ' ', caseFile.conciliationNo,
            ' uzlaştırma nolu yazısı ile talep edilen uzlaştırıcılık görevinde müşteki ',
            PersonService.FullName(person), ', ', this.printDate(extraData.callDate),
            ' tarihinde dosya içerisinde yer alan telefon numarasından aranarak '
        ], p2).tab();
        this.addText([
            competentAuthority.name,
            ' Uzlaştırma Bürosu Görüşme Odasına'
        ], p2).bold();
        this.addText([
            ' davet edilmiş ve şahsın gelmesiyle uzlaştırma kapsamında görüşülmüş ve aşağıdaki tutanak',
            ' tanzim edilmiştir.'
        ], p2);
        this.newLine(2);
        this.printLabelValue([
            ['Uzlaşmaya davet edilen taraf', PersonService.FullName(person)],
            ['Uzlaştırmacı', PersonService.FullName(user)]
        ]);
        const p3 = this.createP();
        this.addText('Müşteki', p3).tab();
        this.addText([
            ' ile yapılan görüşmede uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve ',
            'sonuçları anlatılmış; "'
        ], p3);
        this.addText([
            'uzlaşma gerçekleştiği takdirde, mahmeke, uzlaşma sonucunda sanığın edimini def\'aten ',
            'yerine getirmesi halinde, davanın düşmesine karar vereceği, edimin yerine getirilmesinin ',
            'ileri tarihe bırakılması, takside bağlanması veya süreklilik arzetmesi halinde; ',
            'sanık hakkında, 231 inci maddedeki şartlar aranmaksızın, hükmün açıklanmasının geri ',
            'bırakılmasına karar verileceği, geri bırakma süresince zamanaşımı işlemeyeceği, hükmün ',
            'açıklanmasının geri bırakılmasına karar verildikten sonra, uzlaşmanın gereklerinin yerine ',
            'getirilmemesi halinde, mahkeme tarafından, 231 inci maddenin onbirinci fıkrasındaki şartlar ',
            'aranmaksızın, hükmün açıklanacağı'
        ], p3).italic();
        this.addText([
            '" hususları hatırlatılmış olup; ',
            '"', extraData.crimes, '" ',
            'suçu ilgili olarak '
        ], p3);
        this.addText('müştekinin uzlaşmayı hangi şartlar altında kabul edeceği', p3).underline().bold();
        this.addText(' sorulmuş, ', p3);
        this.addText('müşteki', p3).bold();
        this.addText(' söz alarak;');
        this.addText([
            '"Konu ile ilgili olarak daha önceden ayrıntılı olarak ifade vermiştim, o ifadem doğrudur, aynen tekrar ederim. ',
            'Maddi-manevi hiçbir talebim olmaksızın uzlaşmak istiyorum."'
        ]).tab();
        this.addText([
            'Şeklinde beyanda bulunmuş ve sözlü beyanı tarafımdan yazıya döküldükten sonra kendisine okunmuş ',
            've doğruluğu tasdik olunmuş, Ceza Muhakemesinde Uzlaştırma Yönetmeliği hükümleri gereği uzlaşmanın ',
            'hukukî sonuçları kendisine açıklanarak iş bu tutanak birlikte imza altına alınmıştır. ',
            this.printDate(extraData.officialReportDate)
        ]).tab();

        const p4 = this.createP();
        this.addText(PersonService.FullName(person), p4).tab();
        this.addText(PersonService.FullName(user), p4).tab().tab().tab().tab();
        const p5 = this.createP();
        this.addText('Müşteki', p5).tab();
        this.addText('Uzlaştırmacı', p5).tab().tab().tab().tab();
    }
}
