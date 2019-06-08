import {BaseTemplate, TextAlign} from './base';
import {CaseFile, ClientUser, CompetentAuthority, Party, Person, Address, City} from '../shared/entity';
import {Question, TextboxQuestion, DateQuestion} from '../dynamic-form-question/models';
import {PersonService} from '../shared/repositories';

export interface KovusturmaUzlasmaTeklifProps {
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    person: Person;
    party: Party;
    user: ClientUser;
    personAddress: Address;
    personCity: City;
    extraData: {
        crimes: string,
        personType: string,
        date: string,
    };
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
    protected prepareDocument(props: KovusturmaUzlasmaTeklifProps) {
        const {person, party, user, extraData, competentAuthority, caseFile, personAddress, personCity} = props;

        this.addText('T.C.', TextAlign.Center).bold();
        this.addText([
            competentAuthority.name,
            ' CUMHURİYET BAŞSAVCILIĞI'
        ], TextAlign.Center);
        this.newLine();
        const p1 = this.createP();
        this.addText('Uzlaştırma No:', p1).bold();
        this.addText(caseFile.conciliationNo, p1);

        this.newLine();

        this.addText('UZLAŞMA TEKLİF FORMU', TextAlign.Center).bold();
        const p2 = this.createP();
        this.addText('A. ', p2).bold();
        this.addText([
            '5271 sayılı Ceza Muhakemesi Kanunu\'nun 253 ve 254 üncü maddeleri çerçevesinde, kovuşturma konusu ',
            extraData.crimes,
            ' suçun/suçların uzlaştırmaya tabi olması nedeniyle aşağıda ',
            'açık kimliği belirtilen kişiye bu formun (D)bölümünde yer alan uzlaştırmanın mahiyeti ile uzlaşmayı ',
            'kabul veya reddetmenin hukuki sonuçları anlatılarak uzlaşma teklifinde bulunulmuştur. ',
            this._formatDate(extraData.date),
            'Saat: ',
            this._formatTime(extraData.date)
        ], p2);
        this.addText('Teklifte Bulunan Uzlaştırmacının').bold();
        this.addText('Adı Soyadı').bold();
        this.addText(PersonService.FullName(user));
        this.addText('Sicil No').bold();
        this.addText(user.sicilNumber);

        this.newLine();

        this.addText('B. UZLAŞMA TEKLİFİ YAPILAN').bold();
        this.addText(party.type);

        this.newLine();

        this.addText('C. UZLAŞMA TEKLİFİ YAPILAN KİŞİNİN').bold();
        const p3 = this.createP();
        this.addText('T.C. Kimlik No: ', p3);
        this.addText(person.nId, p3).tab().tab();
        const p4 = this.createP();
        this.addText('Adı Soyadı: ', p4);
        this.addText(PersonService.FullName(person), p4).tab();
        const p5 = this.createP();
        this.addText('Baba Adı: ', p5);
        this.addText(person.fatherName, p5).tab();
        const p6 = this.createP();
        this.addText('Anne Adı: ', p6);
        this.addText(person.motherName, p6).tab();
        const p7 = this.createP();
        this.addText('Doğum Yeri ve Tarihi: ', p7);
        this.addText([person.birthPlace, ', ', this._formatDate(person.birthDate)], p7).tab();
        const p8 = this.createP();
        this.addText('Adres: ', p8);
        this.addText([
            personAddress.fullAddress, ' ', personCity.name, ' ', personAddress.district
        ], p8).tab();
        const p9 = this.createP();
        this.addText('Telefon: ', p9);
        this.addText(person.phone, p9).tab();

        this.newLine();

        this.addText('D. Uzlaştırmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukuki sonuçları:').bold();
        this.addText('1. Uzlaşma, tarafların özgür iradeleriyle belirleyeceği edim karşılığında veya edimsiz olarak anlaşmalarıdır.');
        this.addText([
            '2. Uzlaştırma süreci tarafların kabulüyle başlar, taraflardan biri kabul etmezse süreç işlemez. ',
            'Taraflar uzlaşma sağlanana kadar bu yöndeki iradelerinden her zaman vazgeçebilirler.'
        ]);
        this.addText([
            '3. Şüpheli/sanık ile mağdur/katılan veya suçtan zarar gören arasındaki uzlaştırmada ',
            'esas hakkındaki kararı taraflar kendileri verirler.'
        ]);
        this.addText([
            '4. Uzlaştırmacı, Cumhuriyet başsavcılığı uzlaştırma bürosu tarafından görevlendirilen tarafsız ve bağımsız bir kişidir. ',
            'Uzlaştırmacı sadece görüşmelerin yürütülmesini kolaylaştırır.'
        ]);
        this.addText([
            '5. Uzlaştırmacı taraflara uzlaştırma süreciyle ilgili ayrıntılı bilgilendirme yapar, ',
            'hak ve yükümlülüklerini anlatır ve tarafların uzlaştırmaya ilişkin sorularını cevaplandırır.'
        ]);
        this.addText('6. Uzlaştırma ücreti ve giderlerinden mağdur/katılan veya suçtan zarar gören hiçbir şekilde sorumlu değildir.');
        this.addText([
            '7. Uzlaşmanın sağlanması halinde, şüpheli ya da sanık uzlaştırma giderlerini ödemez. ',
            'Bu giderler Devlet Hazinesi\'nden karşılanır.'
        ]);
        this.addText([
            '8. Uzlaşma teklifinden itibaren üç gün içinde kararın uzlaştırmacıya ',
            'bildirilmemesi halinde, teklif reddedilmiş sayılır.'
        ]);
        this.addText([
            '9. Uzlaştırma müzakereleri gizli olarak yürütülür. Uzlaştırma müzakereleri sırasında tarafların ',
            'konuyla ilgili olarak yapacakları açıklamalar mevcut soruşturmada ve disiplinle ilgili olanlar da ',
            'dahil olmak üzere, hiçbir soruşturma ve kovuşturmada ya da davada delil olarak kullanılamaz, ',
            'herhangi bir yerde açıklanamaz.'
        ]);
        this.addText('10. Uzlaşma teklif formu ile uzlaştırma raporu taraflarca imzalanır.');
        this.addText([
            '11. Mağdur ya da suçtan zarar görenin uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi ',
            'yapması, haklarından vazgeçtiği anlamına gelmez.'
        ]);
        this.addText([
            '12. Şüpheli ya da sanığın uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi yapması suçu ',
            'kabul ettiği anlamına gelmez.'
        ]);
        this.addText([
            '13. Uzlaştırma müzakerelerine; uzlaştırmacı, taraflar ile bunların kanuni temsilcileri, müdafi ve ',
            'vekili katılabilir.'
        ]);
        this.addText([
            '14. Taraflardan herhangi birinin uzlaştırma görüşmelerine katılmaması halinde uzlaşma kabul ',
            'edilmemiş sayılır.'
        ]);
        this.addText([
            '15. Uzlaşmanın sağlanması halinde mağdur, yargılama sürecine girmeksizin uzlaşma sonucu ',
            'belirlenen haklarını alır.'
        ]);
        this.addText([
            '16. Uzlaşmanın sağlanması halinde mağdur, soruşturma/kovuşturma konusu suç nedeniyle ',
            'tazminat davası açamaz, açılmış bir dava varsa feragat etmiş sayılır.'
        ]);
        this.addText([
            '17. Soruşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi halinde, ',
            'şüpheli hakkında kovuşturmaya yer olmadığına dair karar verilir ve adlı sicile kaydedilmez. ',
            'Aksi halde kamu davası açılır.'
        ]);
        this.addText([
            '18. Kovuşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi halinde, sanık ',
            'hakkında düşme kararı verilir ve adlı sicile kaydedilmez. Aksi halde yargılamaya devam ',
            'olunur.'
        ]);
        this.addText([
            '19. Şüpheli ya da sanığın edimini yerine getirmemesi halinde uzlaştırma raporu veya uzlaşma ',
            'belgesi, 2004 sayılı İcra ve İflas Kanunu&#39;nun 38 inci maddesinde yazılı ilam mahiyetinde ',
            'belgelerden sayılır. Bu belge mahkeme kararı gibi İcra olunur.'
        ]);

        this.newLine();

        this.addText(
            'UZLAŞTIRMANIN MAHİYETİ, UZLAŞMAYI KABUL VEYA REDDETMENİN HUKUKI SONUÇLARINI ANLADIM. FORMUN BİR ÖRNEGİNİ ALDIM.'
        ).bold();
        this.addText('Şahsıma yapılan uzlaşma teklifini;').bold();

        const p10 = this.createP();
        this.addText('İnceleyip üç gün içinde beyanda bulunmak istiyorum.', p10);
        this.addText('.../ .../ 20... Saat: ...... İmza', p10).tab();

        const p11 = this.createP();
        this.addText('Kabul ediyorum.', p11);
        this.addText('.../ .../ 20... Saat: ...... İmza', p11).tab();

        const p12 = this.createP();
        this.addText('Kabul etmiyorum.', p12);
        this.addText('.../ .../ 20... Saat: ...... İmza', p12).tab();
    }

    private _formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString();
    }

    private _formatTime(dateString: string) {
        return new Date(dateString).toLocaleTimeString();
    }
}
