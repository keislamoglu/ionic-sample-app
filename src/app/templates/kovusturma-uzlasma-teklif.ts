import {BaseTemplate, TextAlign} from './base';
import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {fullName} from '../shared/helpers';

export interface KovusturmaUzlasmaTeklifProps {
    crimes: string;
    date: string;
}

export const KovusturmaUzlasmaTelifQuestions: Question[] = [
    new TextboxQuestion({
        label: 'Suçlar',
        key: 'crimes',
        required: true,
    }),
    new DateQuestion({
        label: 'Tarih - Saat',
        key: 'date',
        required: true,
        format: 'DD/MM/YYYY HH:mm'
    })
];

export class KovusturmaUzlasmaTeklif extends BaseTemplate<KovusturmaUzlasmaTeklifProps> {
    protected prepareDocument() {
        const {person, party, user, extraData, competentAuthority, caseFile, personAddress, personCity} = this.props.;

        this.text('T.C.', TextAlign.Center).bold();
        this.text([
            competentAuthority.name,
            ' CUMHURİYET BAŞSAVCILIĞI'
        ], TextAlign.Center).bold();
        this.newLine();
        const p1 = this.createParagraph();
        this.text('Uzlaştırma No: ', p1).bold();
        this.text(caseFile.conciliationNo, p1);

        this.newLine();

        this.text('UZLAŞMA TEKLİF FORMU', TextAlign.Center).bold();
        const p2 = this.createParagraph();
        this.text('A. ', p2).bold();
        this.text([
            '5271 sayılı Ceza Muhakemesi Kanunu\'nun 253 ve 254 üncü maddeleri çerçevesinde, kovuşturma konusu ',
            extraData.crimes,
            ' suçun/suçların uzlaştırmaya tabi olması nedeniyle aşağıda ',
            'açık kimliği belirtilen kişiye bu formun (D)bölümünde yer alan uzlaştırmanın mahiyeti ile uzlaşmayı ',
            'kabul veya reddetmenin hukuki sonuçları anlatılarak uzlaşma teklifinde bulunulmuştur. ',
            this.printDate(extraData.date),
            'Saat: ',
            this.printTime(extraData.date)
        ], p2);

        this.newLine();

        this.text('Teklifte Bulunan Uzlaştırmacının', TextAlign.Right).bold();
        this.text('Adı Soyadı', TextAlign.Right).bold();
        this.text(fullName(user), TextAlign.Right);
        this.text('Sicil No', TextAlign.Right).bold();
        this.text(user.registrationNo, TextAlign.Right);

        this.newLine();

        this.text('B. UZLAŞMA TEKLİFİ YAPILAN').bold();
        this.text(party.type);

        this.newLine();

        this.text('C. UZLAŞMA TEKLİFİ YAPILAN KİŞİNİN').bold();

        // The below statement will print like:
        // T.C. Kimlik No: 12345678901
        // ...
        this.printLabelValue([
            ['T.C. Kimlik No', person.identificationNo],
            ['Adı Soyadı', fullName(person)],
            ['Baba Adı', person.fatherName],
            ['Anne Adı', person.motherName],
            ['Doğum Yeri ve Tarihi', `${person.birthPlace} ${this.printDate(person.birthDate)}`],
            ['Adres', `${personAddress.fullAddress}, ${personCity.name}/${personAddress.districtName}`],
            ['Telefon', person.phone]
        ]);

        this.newLine();

        this.text('D. Uzlaştırmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukuki sonuçları:').bold();
        this.text('1. Uzlaşma, tarafların özgür iradeleriyle belirleyeceği edim karşılığında veya edimsiz olarak anlaşmalarıdır.');
        this.text([
            '2. Uzlaştırma süreci tarafların kabulüyle başlar, taraflardan biri kabul etmezse süreç işlemez. ',
            'Taraflar uzlaşma sağlanana kadar bu yöndeki iradelerinden her zaman vazgeçebilirler.'
        ]);
        this.text([
            '3. Şüpheli/sanık ile mağdur/katılan veya suçtan zarar gören arasındaki uzlaştırmada ',
            'esas hakkındaki kararı taraflar kendileri verirler.'
        ]);
        this.text([
            '4. Uzlaştırmacı, Cumhuriyet başsavcılığı uzlaştırma bürosu tarafından görevlendirilen tarafsız ve bağımsız bir kişidir. ',
            'Uzlaştırmacı sadece görüşmelerin yürütülmesini kolaylaştırır.'
        ]);
        this.text([
            '5. Uzlaştırmacı taraflara uzlaştırma süreciyle ilgili ayrıntılı bilgilendirme yapar, ',
            'hak ve yükümlülüklerini anlatır ve tarafların uzlaştırmaya ilişkin sorularını cevaplandırır.'
        ]);
        this.text('6. Uzlaştırma ücreti ve giderlerinden mağdur/katılan veya suçtan zarar gören hiçbir şekilde sorumlu değildir.');
        this.text([
            '7. Uzlaşmanın sağlanması halinde, şüpheli ya da sanık uzlaştırma giderlerini ödemez. ',
            'Bu giderler Devlet Hazinesi\'nden karşılanır.'
        ]);
        this.text([
            '8. Uzlaşma teklifinden itibaren üç gün içinde kararın uzlaştırmacıya ',
            'bildirilmemesi halinde, teklif reddedilmiş sayılır.'
        ]);
        this.text([
            '9. Uzlaştırma müzakereleri gizli olarak yürütülür. Uzlaştırma müzakereleri sırasında tarafların ',
            'konuyla ilgili olarak yapacakları açıklamalar mevcut soruşturmada ve disiplinle ilgili olanlar da ',
            'dahil olmak üzere, hiçbir soruşturma ve kovuşturmada ya da davada delil olarak kullanılamaz, ',
            'herhangi bir yerde açıklanamaz.'
        ]);
        this.text('10. Uzlaşma teklif formu ile uzlaştırma raporu taraflarca imzalanır.');
        this.text([
            '11. Mağdur ya da suçtan zarar görenin uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi ',
            'yapması, haklarından vazgeçtiği anlamına gelmez.'
        ]);
        this.text([
            '12. Şüpheli ya da sanığın uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi yapması suçu ',
            'kabul ettiği anlamına gelmez.'
        ]);
        this.text([
            '13. Uzlaştırma müzakerelerine; uzlaştırmacı, taraflar ile bunların kanuni temsilcileri, müdafi ve ',
            'vekili katılabilir.'
        ]);
        this.text([
            '14. Taraflardan herhangi birinin uzlaştırma görüşmelerine katılmaması halinde uzlaşma kabul ',
            'edilmemiş sayılır.'
        ]);
        this.text([
            '15. Uzlaşmanın sağlanması halinde mağdur, yargılama sürecine girmeksizin uzlaşma sonucu ',
            'belirlenen haklarını alır.'
        ]);
        this.text([
            '16. Uzlaşmanın sağlanması halinde mağdur, soruşturma/kovuşturma konusu suç nedeniyle ',
            'tazminat davası açamaz, açılmış bir dava varsa feragat etmiş sayılır.'
        ]);
        this.text([
            '17. Soruşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi halinde, ',
            'şüpheli hakkında kovuşturmaya yer olmadığına dair karar verilir ve adlı sicile kaydedilmez. ',
            'Aksi halde kamu davası açılır.'
        ]);
        this.text([
            '18. Kovuşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi halinde, sanık ',
            'hakkında düşme kararı verilir ve adlı sicile kaydedilmez. Aksi halde yargılamaya devam ',
            'olunur.'
        ]);
        this.text([
            '19. Şüpheli ya da sanığın edimini yerine getirmemesi halinde uzlaştırma raporu veya uzlaşma ',
            'belgesi, 2004 sayılı İcra ve İflas Kanunu&#39;nun 38 inci maddesinde yazılı ilam mahiyetinde ',
            'belgelerden sayılır. Bu belge mahkeme kararı gibi İcra olunur.'
        ]);

        this.newLine();

        this.text(
            'UZLAŞTIRMANIN MAHİYETİ, UZLAŞMAYI KABUL VEYA REDDETMENİN HUKUKI SONUÇLARINI ANLADIM. FORMUN BİR ÖRNEGİNİ ALDIM.'
        ).bold();

        this.newLine();

        this.text('Şahsıma yapılan uzlaşma teklifini;').bold();

        const p10 = this.createParagraph();
        this.text('İnceleyip üç gün içinde beyanda bulunmak istiyorum.', p10);
        this.text('.../ .../ 20... Saat: ...... İmza', p10).tab();

        const p11 = this.createParagraph();
        this.text('Kabul ediyorum.', p11);
        this.text('.../ .../ 20... Saat: ...... İmza', p11).tab();

        const p12 = this.createParagraph();
        this.text('Kabul etmiyorum.', p12);
        this.text('.../ .../ 20... Saat: ...... İmza', p12).tab();
    }
}
