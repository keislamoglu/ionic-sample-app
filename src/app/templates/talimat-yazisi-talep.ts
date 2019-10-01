import {BaseTemplate, TextAlign} from './base';
import {Address, CaseFile, City, ClientUser, CompetentAuthority, Person} from '../shared/entity';
import {DateQuestion, Question} from '../dynamic-form-question/models';
import {PersonService} from '../shared/repositories';

export interface TalimatYazisiTalepProps {
    user: ClientUser;
    person: Person;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    personAddress: Address;
    personCity: City;
    extraData: {
        date: string
    };
}

export const TalimatYazisiTalepQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true,
    })
];

export class TalimatYazisiTalep extends BaseTemplate<TalimatYazisiTalepProps> {
    protected prepareDocument(props: TalimatYazisiTalepProps) {
        const {
            user,
            person,
            caseFile,
            competentAuthority,
            extraData,
        } = props;

        this.text(`${competentAuthority.name} CUMHURİYET BAŞSAVCILIĞINA`, TextAlign.Center).bold();
        this.text(`(Uzlaştırma Bürosu)`, TextAlign.Center).bold();
        this.newLine();
        const p1 = this.createParagraph();
        this.text(`Uzlaştırma No: `, p1).bold();
        this.text(caseFile.conciliationNo, p1);
        this.newLine();
        const p2 = this.createParagraph();
        this.indentedText(`Yukarıda numarası yazılı uzlaştırma dosyası kapsamında yapılan müzakereler sonucunda `, p2);
        this.text(`UZLAŞMA SAĞLANMIŞ / SAĞLANAMAMIŞ`, p2).bold();
        this.text([
            ` olup, aşağıda açık kimlik bilgileri yazılı dosyanın tarafı olan şahsın Cumhuriyet Başsavcılığınız`,
            ` yargı sınırları dışında bulunması sebebiyle ekte sunduğum`
        ], p2);
        this.text(` uzlaşma teklif formu, uzlaştırmacı görüşme tutanağı ve uzlaştırma raporunun`, p2);
        this.text([
            ` yetkili Cumhuriyet Başsavcılığı kanalıyla adı geçen şahsa imzalatılması hususunda gereğinin`,
            ` takdirini saygılarımla arz ederim.`,
            this.printDate(extraData.date)
        ], p2);
        this.newLine();
        this.text(PersonService.FullName(user), TextAlign.Right);
        this.text(`Uzlaştırmacı`, TextAlign.Right);
        this.newLine(2);
        this.text(`Eki: Uzlaşma teklif formu (2 adet)`).bold();
        this.text(`     Uzlaştırmacı görüşme tutanağı (2 adet)`).bold();
        this.text(`     Uzlaştırma raporu (3 adet)`).bold();
        this.newLine();
        this.text(`KİMLİK BİLGİLERİ:`).bold().underline();
        this.printLabelValue([
            ['T.C. Kimlik Numarası', person.identificationNo],
            ['Adı Soyadı', PersonService.FullName(person)],
            ['Baba Adı', person.fatherName],
            ['Anne Adı', person.motherName],
            ['Doğum Yeri-Tarihi', `${person.birthPlace}-${this.printDate(person.birthDate)}`],
            [`Adres`, this.printPersonAddress()],
            ['Telefon', person.phone]
        ]);
    }

    printPersonAddress(): string {
        const {personCity: city, personAddress: address} = this.props;
        return `${address.fullAddress}, ${address.districtName}, ${city.name}`;
    }
}
