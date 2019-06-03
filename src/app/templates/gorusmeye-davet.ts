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
    protected prepareDocument() {
        this.addText('UZLAŞMA GÖRÜŞMESİNE DAVET MEKTUBU', TextAlign.Center).bold().underline();

        this.newLine();
        this.addText(`Uzlaştırma No: ${this.props.caseFile.fileNo}`).bold();

        this.newLine();
        this.addText(`Sayın ${this.fullName(this.props.person)}`, TextAlign.Center).bold();
        this.addText(`(Adres: ${this.props.person.address})`, TextAlign.Center);

        this.addText(this.props.competentAuthority.name +
            ' Cumhuriyet Başsavcılığı tarafından yürütülen yukarıda numarası belirtilen dosyada taraf olarak bulunmaktasınız.' +
            ' Soruşturma/kovuşturmaya konu suçun, 5271 sayılı CMK\'nın 253 ve 254’üncü maddeleri gereğince uzlaşma kapsamındaki' +
            ' suçlardan olması nedeniyle, uzlaşma işlemlerinin yürütülebilmesi için Cumhuriyet Başsavcılığı Uzlaştırma Bürosu' +
            ' tarafından uzlaştırmacı olarak görevlendirilmiş bulunmaktayım.', TextAlign.Justified).tab();

        const p2 = this.createP().justified();
        this.addText('Bu mektubu, uzlaşma görüşmelerini başlatmak için yazmaktayım.' +
            ' Mektubun ekinde uzlaşmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukukî sonuçlarının bulunduğu ', p2).tab();
        this.addText('Uzlaşma Teklif Formu', p2).italic();
        this.addText(' bulunmaktadır. Bu formu dikkatlice okumanızı tavsiye ederim. Açıklamamı istediğiniz bir husus' +
            ' var ise 3 günlük süre içerisinde ', p2);
        this.addText('mesai saatleri içerisinde', p2).underline();
        this.addText(' aşağıda belirtilen telefon numarası üzerinden bana ulaşabilirsiniz.', p2);

        const p3 = this.createP().justified();
        this.addText('Ceza Muhakemesinde Uzlaştırma Yönetmeliği’nin 30 ve 34/2’nci maddeleri gereğince; bu mektubun' +
            ' elinize geçmesinden itibaren ', p3).tab();
        this.addText('en geç 3 gün içinde', p3).bold();
        this.addText(' tarafımla irtibata geçmeniz ve kararını bildirmeniz gerekmektedir. Bu süre içinde benimle' +
            ' irtibata geçmediğiniz takdirde uzlaşma teklifini reddetmiş sayılacağınızı hatırlatırım. Bu durumda soruşturma' +
            ' / kovuşturma işlemlerine kaldığı yerden devam edilecek ve bir daha uzlaşma usulü uygulanamayacaktır.', p3);

        this.addText('Saygı ile bilgilerinize sunarım. ' + new Date(this.props.date).toLocaleDateString()).tab();

        this.newLine();
        this.addText(this.fullName(this.props.user), TextAlign.Right);
        this.addText('Uzlaştırmacı', TextAlign.Right);

        this.newLine();
        const attachmentP = this.createP();
        this.addText('Ek: ', attachmentP).bold();
        this.addText('Uzlaştırma teklif formu', attachmentP);

        this.newLine();
        this.addText('UZLAŞTIRMACI İLETİŞİM BİLGİLERİ :').bold().underline();

        this.newLine();

        const addressP = this.createP();
        this.addText('Adres', addressP).bold();
        this.addText(': ', addressP).bold().tab().tab();
        this.addText(this.props.user.address, addressP);

        const phoneP = this.createP();
        this.addText('Telefon', phoneP).bold();
        this.addText(': ', phoneP).bold().tab().tab();
        this.addText(this.props.user.phone, phoneP);
    }

    private fullName(person: Person | ClientUser) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
