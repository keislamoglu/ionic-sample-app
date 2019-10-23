import {DateQuestion, Question} from '../dynamic-form-question/models';
import {BaseTemplate, TextAlign} from './base';
import {CaseFileType, PartyType} from '../shared/entity';
import {fullName} from '../shared/helpers';

export interface UzlasmaTeklifFormuProps {
    date: string;
}

export const UzlasmaTeklifFormuQuestions: Question[] = [
    new DateQuestion({
        label: 'Tarih - Saat',
        key: 'date',
        required: true,
        format: 'DD/MM/YYYY HH:mm'
    }),
];

export class UzlasmaTeklifFormu extends BaseTemplate<UzlasmaTeklifFormuProps> {

    protected prepareDocument() {
        const {petition, extraData} = this.props;
        const {caseFile} = petition;
        const {attorneyGeneralship, courtHouse} = caseFile;
        const competentAuthority = caseFile.type === CaseFileType.Investigation ? attorneyGeneralship.name : courtHouse.name;
        const suspected = caseFile.parties.find(t => t.type === PartyType.Suspected);
        const [party] = petition.parties;

        this.text('T.C.', TextAlign.Center).bold();
        this.text(competentAuthority, TextAlign.Center).bold();
        this.newLine();

        this.paragraph(() => {
            this.text('Uzlaştırma No: ').bold();
            this.text(caseFile.conciliationNo);
        });

        this.newLine();
        this.text('UZLAŞMA TEKLİF FORMU', TextAlign.Center).bold();

        const translator = caseFile.parties.find(t => t.relatedPersonId === party.personId && t.type === PartyType.Translator);

        this.paragraph(() => {
            this.text('A. ').bold();
            this.text([
                `5271 sayılı Ceza Muhakemesi Kanunu'nun 253 ve 254 üncü maddeleri çerçevesinde,`,
                ` ${caseFile.type.toLocaleLowerCase()} konusu `,
                suspected.crimes,
                this.hasMultiCrimes(suspected.crimes) ? 'suçlarının' : 'suçunun',
                ' uzlaştırmaya tabi olması nedeniyle aşağıda',
                ' açık kimliği belirtilen kişiye bu formun (D) bölümünde yer alan uzlaştırmanın mahiyeti ile uzlaşmayı',
                ` kabul veya reddetmenin hukuki sonuçları`,
                translator ? (fullName(translator.person) + ' vasıtasıyla ') : '',
                ` anlatılarak uzlaşma teklifinde bulunulmuştur.`,
                this.printDate(extraData.date),
                'Saat: ',
                this.printTime(extraData.date)
            ]);
        });

        this.newLine();
        this.text(`B. UZLAŞMA TEKLİFİ YAPILAN : ${party.type.toLocaleUpperCase()}`).bold();
        this.newLine();
        this.text(`C. UZLAŞMA TEKLİFİ YAPILAN KİŞİNİN`).bold();
        this.printLabelValue([
            ['T.C. Kimlik No', party.person.identificationNo],
            ['Adı Soyadı', fullName(party.person)],
            ['Baba Adı', party.person.fatherName],
            ['Anne Adı', party.person.motherName],
            ['Doğum Yeri ve Tarihi', `${party.person.birthPlace} ${this.printDate(party.person.birthDate)}`],
            ['Adres', `${party.person.address.fullAddress}, ${party.person.address.city.name}/${party.person.address.districtName}`],
            ['Telefon', party.person.phone]
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
        this.indentedText(`Uzlaştırmanın mahiyeti, uzlaşmayı kabul veya reddetmenin hukuki sonuçlarını anladım.`);
        this.indentedText(`Formun bir örneğini aldım.`);
        this.newLine();
        this.text(`Şahsıma yapılan uzlaşma teklifini;`).bold();
        this.text(`....................................................................................................`);

        this.paragraph(() => {
            this.text(`İnceleyip üç gün içinde beyanda bulunmak istiyorum.`);
            this.text(`.../ .../ 20... Saat: ...... İmza`).tab();
        });

        this.text(`....................................................................................................`);

        this.paragraph(() => {
            this.text(`Kabul ediyorum.`);
            this.text(`.../ .../ 20... Saat: ...... İmza`).tab();
        });

        this.text(`....................................................................................................`);

        this.paragraph(() => {
            this.text(`Kabul etmiyorum.`);
            this.text(`.../ .../ 20... Saat: ...... İmza`).tab();
        });

        this.text(`....................................................................................................`);
        this.newLine();

        if (translator) {
            this.text(`Tercüman: ${fullName(translator.person)}`);
        }
    }

    hasMultiCrimes(crimes: string = '') {
        return crimes.split(',').length > 1;
    }
}
