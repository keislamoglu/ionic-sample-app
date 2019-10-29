import {BaseTemplate, TextAlign} from './base';
import {fullName} from '../../shared/helpers';
import {DateQuestion, Question} from '../../dynamic-form-question/models';

export interface GorusmeyeDavetProps {
    date: string;
}

export const GorusmeyeDavetQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true
    }),
];

export class GorusmeyeDavet extends BaseTemplate<GorusmeyeDavetProps> {
    protected prepareDocument() {
        const {conciliator, petition, extraData} = this.props;
        const {caseFile, parties} = petition;
        const [party] = parties;
        const {person} = party;

        this.text('UZLAŞMA GÖRÜŞMESİNE DAVET MEKTUBU', TextAlign.Center).bold().underline();

        this.newLine();
        this.text(`Uzlaştırma No: ${caseFile.fileNo}`).bold();

        this.newLine();
        this.text(`Sayın ${fullName(person)}`, TextAlign.Center).bold();
        this.text(`(Adres: ${person.address})`, TextAlign.Center);

        this.indentedText(caseFile.attorneyGeneralship.name +
            ' tarafından yürütülen yukarıda numarası belirtilen dosyada taraf olarak bulunmaktasınız.' +
            ' Soruşturma/kovuşturmaya konu suçun, 5271 sayılı CMK\'nın 253 ve 254’üncü maddeleri gereğince uzlaşma kapsamındaki' +
            ' suçlardan olması nedeniyle, uzlaşma işlemlerinin yürütülebilmesi için Cumhuriyet Başsavcılığı Uzlaştırma Bürosu' +
            ' tarafından uzlaştırmacı olarak görevlendirilmiş bulunmaktayım.', TextAlign.Justified);

        const p2 = this.createParagraph().justified();
        this.indentedText('Bu mektubu, uzlaşma görüşmelerini başlatmak için yazmaktayım.' +
            ' Mektubun ekinde uzlaşmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukukî sonuçlarının bulunduğu ', p2);
        this.text('Uzlaşma Teklif Formu', p2).italic();
        this.text(' bulunmaktadır. Bu formu dikkatlice okumanızı tavsiye ederim. Açıklamamı istediğiniz bir husus' +
            ' var ise 3 günlük süre içerisinde ', p2);
        this.text('mesai saatleri içerisinde', p2).underline();
        this.text(' aşağıda belirtilen telefon numarası üzerinden bana ulaşabilirsiniz.', p2);

        const p3 = this.createParagraph().justified();
        this.indentedText('Ceza Muhakemesinde Uzlaştırma Yönetmeliği’nin 30 ve 34/2’nci maddeleri gereğince; bu mektubun' +
            ' elinize geçmesinden itibaren ', p3);
        this.text('en geç 3 gün içinde', p3).bold();
        this.text(' tarafımla irtibata geçmeniz ve kararını bildirmeniz gerekmektedir. Bu süre içinde benimle' +
            ' irtibata geçmediğiniz takdirde uzlaşma teklifini reddetmiş sayılacağınızı hatırlatırım. Bu durumda soruşturma' +
            ' / kovuşturma işlemlerine kaldığı yerden devam edilecek ve bir daha uzlaşma usulü uygulanamayacaktır.', p3);

        this.indentedText('Saygı ile bilgilerinize sunarım. ' + new Date(extraData.date).toLocaleDateString());

        this.newLine();
        this.text(fullName(conciliator), TextAlign.Right);
        this.text('Uzlaştırmacı', TextAlign.Right);

        this.newLine();
        const attachmentP = this.createParagraph();
        this.text('Ek: ', attachmentP).bold();
        this.text('Uzlaştırma teklif formu', attachmentP);

        this.newLine();
        this.text('UZLAŞTIRMACI İLETİŞİM BİLGİLERİ :').bold().underline();

        this.newLine();

        const addressP = this.createParagraph();
        this.text('Adres', addressP).bold();
        this.text(': ', addressP).bold().tab().tab();
        this.text(conciliator.address, addressP);

        const phoneP = this.createParagraph();
        this.text('Telefon', phoneP).bold();
        this.text(': ', phoneP).bold().tab().tab();
        this.text(conciliator.phone, phoneP);
    }
}
