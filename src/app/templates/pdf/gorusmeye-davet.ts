import {DateQuestion, Question} from '../../dynamic-form-question/models';
import {ClientUser, Petition} from '../../shared/entity';
import {fullName} from '../../shared/helpers';

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

export interface Props<T> {
    petition: Petition;
    extraData: T;
    conciliator: ClientUser;
}

export class GorusmeyeDavet {
    documentDefinition(props: Props<GorusmeyeDavetProps>) {
        const {conciliator, petition, extraData} = props;
        const {caseFile} = petition;
        const [party] = petition.parties;
        const attorneyGeneralship = caseFile.attorneyGeneralship;
        const printDate = dateString => new Date(dateString).toLocaleDateString();

        return {
            content: [
                '\n\n',
                {text: 'UZLAŞMA GÖRÜŞMESİNE DAVET MEKTUBU', alignment: 'center', style: 'heading'},
                '\n\n',
                {
                    text: [
                        {text: 'Uzlaştırma No: ', bold: true},
                        {text: caseFile.fileNo} // case file no
                    ]

                },
                {text: `Sayın ${fullName(party.person)}`, alignment: 'center', bold: true},
                {text: `(Adres: ${party.person.address.fullAddress}) `, italics: true, alignment: 'center'},
                '\n',
                // tslint:disable-next-line:max-line-length
                `${attorneyGeneralship.name} tarafından yürütülen yukarıda numarası belirtilen dosyada taraf olarak bulunmaktasınız. Soruşturma/kovuşturma konu suçun, 5271 sayılı CMK'nın 253 ve 254'üncü maddeleri gereğince uzlaşma kapsamındaki suçlardan olması nedeniyle, uzlaşma işlemlerinin yürütülebilmesi için Cumhuriyet Başsavcılığı Uzlaştırma Bürosu tarafından uzlaştırmacı olarak görevlendirilmiş bulunmaktayım.`,
                '\n',
                {
                    text: [
                        // tslint:disable-next-line:max-line-length
                        `Bu mektubu, uzlaşma görüşmelerini başlatmak için yazmaktayım. Mektubun ekinde uzlaşmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukukî sonuçlarının bulunduğu `,
                        {text: `Uzlaşma Teklif Formu`, italics: true},
                        // tslint:disable-next-line:max-line-length
                        ` bulunmaktadır. Bu formu dikkatlice okumanızı tavsiye ederim. Açıklamamı istediğiniz bir husus var ise 3 günlük süre içerisinde mesai saatleri içerisinde aşağıda belirtilen telefon numarası üzerinden bana ulaşabilirsiniz.`,
                    ]
                },
                '\n',
                {
                    text: [
                        // tslint:disable-next-line:max-line-length
                        `Ceza Muhakemesinde Uzlaştırma Yönetmeliği'nin 30 ve 34/2'nci maddeleri gereğince; bu mektubun elinize geçmesinden itibaren `,
                        {text: `en geç 3 gün içinde`, bold: true},
                        // tslint:disable-next-line:max-line-length
                        ` tarafımla irtibata geçmeniz ve kararınızı bildirmeniz gerekmektedir. Bu süre içinde benimle irtibata geçmediğiniz takdirde uzlaşma teklifini reddetmiş sayılacağınızı hatırlatırım. Bu durumda soruşturma / kovuşturma işlemlerine kaldığı yerden devam edilecek ve bir daha uzlaşma usulü uygulanamayacaktır.`
                    ]
                },
                '\n',
                `Saygı ile bilgilerinize sunarım. ${printDate(extraData.date)}`,
                '\n',
                {text: fullName(conciliator), alignment: 'right'},
                {text: `Uzlaştırmacı`, alignment: 'right'},
                '\n\n',
                {
                    text: [
                        {text: `Ek: `, bold: true}, `Uzlaştırma teklif formu`
                    ]
                },
                '\n\n',
                {text: `UZLAŞTIRMACI İLETİŞİM BİLGİLERİ:`, style: 'heading'},
                {
                    text: [
                        {text: `Adres  \t\t: `, bold: true},
                        conciliator.address
                    ]
                },
                {
                    text: [
                        {text: `Telefon\t\t: `, bold: true},
                        conciliator.phone
                    ]
                }
            ],
            styles: {
                heading: {
                    fontSize: 12,
                    bold: true,
                },
            }

        };
    }
}
