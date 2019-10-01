import {DateQuestion, DropdownQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {BaseTemplate, TextAlign} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Person} from '../shared/entity';
import {PersonService} from '../shared/repositories';

export interface GorusmelerinYapilamadiginaDairTutanakProps {
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    user: ClientUser;
    suspectedPerson: Person;
    complainantPerson: Person;
    extraData: {
        date: string,
        crimes: string,
        complainantInviteDate: string,
        complainantApplyDate: string,
        complainantResponse: string,
        suspectedInviteDate: string,
        suspectedApplyDate: string,
        suspectedResponse: string,
        courtHouse: string
    };
}

export const GorusmelerinYapilamadiginaDairTutanakQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Dilekçe tarihi',
        required: true
    }),
    new TextboxQuestion({
        key: 'crimes',
        label: 'Suçlar',
        required: true
    }),
    new TextboxQuestion({
        key: 'courtHouse',
        label: 'Davet edilen adliye',
        required: true
    }),
    new DateQuestion({
        key: 'complainantInviteDate',
        label: 'Müşteki davet tairihi',
        required: true
    }),
    new DateQuestion({
        key: 'complainantApplyDate',
        label: 'Müşteki müracaat tarihi',
        required: true
    }),
    new DropdownQuestion({
        key: 'complainantResponse',
        label: 'Müşteki uzlaştırma teklifini',
        options: [
            {key: 'accepted', value: 'Kabul etti'},
            {key: 'rejected', value: 'Kabul etmedi'}
        ],
        required: true
    }),
    new DateQuestion({
        key: 'suspectedInviteDate',
        label: 'Şüpheli davet tarihi',
        required: true
    }),
    new DateQuestion({
        key: 'suspectedApplyDate',
        label: 'Şüpheli müracaat tarihi',
        required: true
    }),
    new DropdownQuestion({
        key: 'suspectedResponse',
        label: 'Şüpheli uzlaştırma teklifini',
        options: [
            {key: 'accepted', value: 'Kabul etti'},
            {key: 'rejected', value: 'Kabul etmedi'}
        ],
        required: true
    })
];

export class GorusmelerinYapilamadiginaDairTutanak extends BaseTemplate<GorusmelerinYapilamadiginaDairTutanakProps> {
    protected prepareDocument(props: GorusmelerinYapilamadiginaDairTutanakProps) {
        const {
            caseFile,
            competentAuthority,
            user,
            suspectedPerson: suspected,
            complainantPerson: complainant,
            extraData
        } = props;

        this.text(`UZLAŞTIRMA GÖRÜŞMELERİNİN`, TextAlign.Center).bold();
        this.text(`YAPILAMADIĞINA DAİR TUTANAK`, TextAlign.Center).bold();
        this.newLine();
        this.text(`Uzlaştırma No: ${caseFile.conciliationNo}`).bold();

        const p1 = this.createParagraph();

        this.indentedText([
            `Yukarıda uzlaştırma numarası yazılı `,
            this.printDate(caseFile.chargeDate),
            ` tarihli görevlendirme tutanağı ile tarafıma tevdi edilen `,
        ], p1);
        this.text(`${competentAuthority.name} ${caseFile.fileNo} numaralı soruşturma`, p1).bold();

        const suspectedName = PersonService.FullName(suspected);
        const complainantName = PersonService.FullName(complainant);

        this.text([
            ` dosyasında şüpheli `,
            suspectedName,
            ` müşteki `,
            complainantName,
            `'a yönelik `,
            extraData.crimes,
            ` suçu/suçları (5237 sayılı Türk Ceza Kanunu 125/1 maddesinde) 5271 sayılı CMK 253. maddesi kapsamında`,
            ` "uzlaşma" uzlaşma kapsamındaki suçlardan olması nedeni ile;`
        ], p1);

        const p2 = this.createParagraph();

        this.indentedText(`1) Müşteki `, p2);
        this.text(complainantName, p2).bold();
        this.text([
            ` dosyada mevcut telefon numarasından `,
            this.printDate(extraData.complainantInviteDate),
            ` tarihinde aranarak uzlaşma teklifi yapılmak üzere `,
            extraData.courtHouse,
            `ne davet edilmiştir. `,
            this.printDate(extraData.complainantApplyDate),
            ` günü müracaatta buunan müşteki `,
            complainantName,
            ` kendine yapılan `,
            this.printDate(extraData.complainantApplyDate),
            ` tarihli uzlaşma teklifini `
        ], p2);
        this.text(`kabul ${extraData.complainantResponse === 'accepted' ? 'etmiştir' : 'etmemiştir'}.`, p2);

        const p3 = this.createParagraph();

        this.indentedText(`2) Şüpheli `, p3);
        this.text(suspectedName, p3).bold();
        this.text([
            ` dosyada mevcut telefon numarasından `,
            this.printDate(extraData.suspectedInviteDate),
            ` tarihinde aranarak uzlaşma teklifi yapılmak üzere `,
            extraData.courtHouse,
            `ne davet edilmiştir. `,
            this.printDate(extraData.suspectedApplyDate),
            ` günü müracaatta bulunan Şüpheli `,
            suspectedName,
            ` kendine yapılan `,
            this.printDate(extraData.suspectedApplyDate),
            ` tarihli uzlaşma teklifini `
        ], p3);
        this.text(`kabul ${extraData.suspectedResponse === 'accepted' ? 'etmiştir' : 'etmemiştir'}.`, p3);
        this.newLine();

        const p4 = this.createParagraph();
        let acceptedName = '?';
        let rejectedName = '?';
        let acceptedParty = '?';
        let rejectedParty = '?';

        if (extraData.suspectedResponse === 'accepted') {
            acceptedName = suspectedName;
            acceptedParty = 'şüpheli';
        } else if (extraData.suspectedResponse === 'rejected') {
            rejectedName = suspectedName;
            rejectedParty = 'şüpheli';
        }
        if (extraData.complainantResponse === 'accepted') {
            acceptedName = complainantName;
            acceptedParty = 'müşteki';
        } else if (extraData.complainantResponse === 'rejected') {
            rejectedName = complainantName;
            rejectedParty = 'müşteki';
        }

        this.indentedText([
            `Uzlaşma görüşmelerinin başlatılabilmesi için tarafların tümü tarafından kabul edilmesi gerektiği,`,
            ` iş bu dosyada `,
            `${acceptedParty} ${acceptedName}`,
            `'a yapılan uzlaşma teklifi kabul edilmiş ise de `,
            `${rejectedParty} ${rejectedName}`,
            ` tarafından uzlaşma teklifinin kabul edilmemiş olması nedeni ile uzlaşma görüşleri başlanamamış,`,
            ` tarafımca yapılacak başka bir işlem kalmadığından, tarafıma tevdi edilen `,
            `${competentAuthority.name} ${caseFile.fileNo}`,
        ], p4).bold();
        this.text([
            ` soruşturma numaralı dosya sureti ile tarafımca düzenlenen işlemlere ilişkin belgeler iş bu tutanak ekinde`,
            ` Cumhuriyet Başsavcılığınıza iade edilmiştir.`
        ], p4);
        this.indentedText([
            `Gereğini takdirinize arz ederim. `,
            this.printDate(extraData.date)
        ]);

        this.newLine();

        this.text(PersonService.FullName(user), TextAlign.Right);
        this.text(user.registrationNo, TextAlign.Right);
        this.text(`Uzlaştırmacı`, TextAlign.Right);

        this.newLine();

        this.text(`Ekler:`);
        this.text(`1. ${competentAuthority.name} ${caseFile.fileNo} soruşturma numaralı dosya sureti`);
        this.text(`Uzlaştırma Teklif Formları (3 Adet)`);
        this.text(`Masraf Belgesi`);
    }
}
