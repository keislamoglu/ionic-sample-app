import {CaseFile, ClientUser, CompetentAuthority, Person} from '../shared/entity';
import {BaseTemplate, TextAlign} from './base';

export interface GorusmeyeDavetProps {
    caseFile: CaseFile;
    person: Person;
    competentAuthority: CompetentAuthority;
    date: string;
    user: ClientUser;
}

export class GorusmeyeDavet extends BaseTemplate<GorusmeyeDavetProps> {
    protected prepareDocument(props: GorusmeyeDavetProps) {
        this.text('UZLAŞMA GÖRÜŞMESİNE DAVET MEKTUBU', TextAlign.Center).bold().underline();

        this.newLine();
        this.text(`Uzlaştırma No: ${props.caseFile.fileNo}`).bold();

        this.newLine();
        this.text(`Sayın ${this.fullName(props.person)}`, TextAlign.Center).bold();
        this.text(`(Adres: ${props.person.address})`, TextAlign.Center);

        this.text(props.competentAuthority.name +
            ' Cumhuriyet Başsavcılığı tarafından yürütülen yukarıda numarası belirtilen dosyada taraf olarak bulunmaktasınız.' +
            ' Soruşturma/kovuşturmaya konu suçun, 5271 sayılı CMK\'nın 253 ve 254’üncü maddeleri gereğince uzlaşma kapsamındaki' +
            ' suçlardan olması nedeniyle, uzlaşma işlemlerinin yürütülebilmesi için Cumhuriyet Başsavcılığı Uzlaştırma Bürosu' +
            ' tarafından uzlaştırmacı olarak görevlendirilmiş bulunmaktayım.', TextAlign.Justified).tab();

        const p2 = this.createParagraph().justified();
        this.text('Bu mektubu, uzlaşma görüşmelerini başlatmak için yazmaktayım.' +
            ' Mektubun ekinde uzlaşmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukukî sonuçlarının bulunduğu ', p2).tab();
        this.text('Uzlaşma Teklif Formu', p2).italic();
        this.text(' bulunmaktadır. Bu formu dikkatlice okumanızı tavsiye ederim. Açıklamamı istediğiniz bir husus' +
            ' var ise 3 günlük süre içerisinde ', p2);
        this.text('mesai saatleri içerisinde', p2).underline();
        this.text(' aşağıda belirtilen telefon numarası üzerinden bana ulaşabilirsiniz.', p2);

        const p3 = this.createParagraph().justified();
        this.text('Ceza Muhakemesinde Uzlaştırma Yönetmeliği’nin 30 ve 34/2’nci maddeleri gereğince; bu mektubun' +
            ' elinize geçmesinden itibaren ', p3).tab();
        this.text('en geç 3 gün içinde', p3).bold();
        this.text(' tarafımla irtibata geçmeniz ve kararını bildirmeniz gerekmektedir. Bu süre içinde benimle' +
            ' irtibata geçmediğiniz takdirde uzlaşma teklifini reddetmiş sayılacağınızı hatırlatırım. Bu durumda soruşturma' +
            ' / kovuşturma işlemlerine kaldığı yerden devam edilecek ve bir daha uzlaşma usulü uygulanamayacaktır.', p3);

        this.text('Saygı ile bilgilerinize sunarım. ' + new Date(props.date).toLocaleDateString()).tab();

        this.newLine();
        this.text(this.fullName(props.user), TextAlign.Right);
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
        this.text(props.user.address, addressP);

        const phoneP = this.createParagraph();
        this.text('Telefon', phoneP).bold();
        this.text(': ', phoneP).bold().tab().tab();
        this.text(props.user.phone, phoneP);
    }

    private fullName(person: Person | ClientUser) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
