import {DateQuestion, Question, TextboxQuestion} from '../dynamic-form-question/models';
import {BaseTemplate, TextAlign} from './base';
import {Address, CaseFile, City, ClientUser, CompetentAuthority, ExtensionTime, Party, PartyType, Person} from '../shared/entity';
import {fullName} from '../shared/helpers';

export interface SorusturmaOlumsuzUzlastirmaRaporuProps {
    user: ClientUser;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    extraData: {
        reportPlace: string;
        reportDate: string;
        conciliationDuration: string;
        crimes: string;
    };
    allParties: Party[];
    allPersons: Person[];
    allAddresses: Address[];
    allCities: City[];
    extensionTime: ExtensionTime;
}

export const SorusturmaOlumsuzUzlastirmaRaporuQuestions: Question[] = [
    new TextboxQuestion({
        key: 'reportPlace',
        label: 'Raporun düzenlendiği yer',
        required: true,
    }),
    new DateQuestion({
        key: 'reportDate',
        label: 'Raporun düzenleme tarihi',
        required: true
    }),
    new TextboxQuestion({
        key: 'conciliationDuration',
        label: 'Uzlaşma süresi',
        required: true
    }),
    new TextboxQuestion({
        key: 'crimes',
        label: 'Uzlaşma konusu suç/suçlar',
        required: true
    }),
];

export class SorusturmaOlumsuzUzlastirmaRaporu extends BaseTemplate<SorusturmaOlumsuzUzlastirmaRaporuProps> {
    protected prepareDocument(props: SorusturmaOlumsuzUzlastirmaRaporuProps) {
        const {
            caseFile,
            competentAuthority,
            extraData,
            user,
            extensionTime,
        } = props;
        this.text('UZLAŞTIRMA RAPORU').bold();
        this.newLine();
        this.printLabelValue([
            ['Soruşturma No', caseFile.fileNo],
            ['Cumhuriyet Başsavcılığı Uzlaştırma No', caseFile.conciliationNo],
            ['Uzlaştırmacının:']
        ]);
        this.printIndentedLabelValue([
            ['Adı ve Soyadı', fullName(user)],
            ['Adresi', user.address],
            ['Sicil Numarası', user.registrationNo]
        ]);
        this.printLabelValue([
            ['Görevlendirme tarihi', this.printDate(caseFile.chargeDate)],
            ['Dosya içindeki belgelerin birer örneğinin verildiği / Uzlaştırma süresinin başladığı tarih',
                this.printDate(caseFile.conciliationStartDate)],
            ['Ek süre verilme tarihi', this.printDate(extensionTime.date)],
        ]);

        const injured = this.getPersonByPartyType(PartyType.Injured) ||
            this.getPersonByPartyType(PartyType.Complainant);
        const suspected = this.getPersonByPartyType(PartyType.Suspected);

        const parties = [
            {
                title: 'Sanığın',
                person: suspected
            },
            {
                title: 'Kanunî temsilcisinin',
                person: this.getPersonByPartyType(PartyType.SuspectedLegalDelegate)
            },
            {
                title: 'Müdafiin / Vekilin',
                person: this.getPersonByPartyType(PartyType.SuspectedAdvocate) ||
                    this.getPersonByPartyType(PartyType.SuspectedRepresentative)
            },
            {
                title: 'Mağdurun / Müştekinin / Suçtan Zarar Görenin',
                person: injured
            },
            {
                title: 'Müdafiin / Vekilin',
                person: this.getPersonByPartyType(PartyType.InjuredAdvocate) ||
                    this.getPersonByPartyType(PartyType.InjuredRepresentative)
            },
            {
                title: 'Tercümanın',
                person: this.getPersonByPartyType(PartyType.Translator)
            }
        ];

        for (const party of parties) {
            const {title, person} = party;

            if (!person) {
                continue;
            }

            this.printLabelValue([[title]]);
            this.printIndentedLabelValue([
                ['Adı ve Soyadı', fullName(person)],
                ['T.C. kimlik numarası', person.identificationNo],
                ['Adresi', this.printAddress(person)]
            ]);
        }

        this.printLabelValue([
            ['Raporun düzenlendiği yer', extraData.reportPlace],
            ['Raporun düzenlenme tarihi', this.printDate(extraData.reportDate)],
            ['Uzlaştırma süresi', `${extraData.conciliationDuration} gün`],
            ['Uzlaşma konusu suç / suçlar', extraData.crimes],
            ['Uzlaştırma sonucu', 'UZLAŞMA SAĞLANAMADI']
        ]);

        this.indentedText([
            competentAuthority.name,
            ` Cumhuriyet Başsavcılığı Uzlaştırma Bürosu'nun yukarıda numarası yazılı uzlaştırma dosyası kapsamında;`
        ]);

        this.newLine();

        this.indentedText([
            `Taraflar usulüne uygun olarak davet edilmiş ve taraflar bu davete icabet ederek,`,
            ` uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve sonuçları hakkında bilgi aldıktan sonra özgür`,
            ` iradeleriyle uzlaşmayı kabul ettiklerini beyan etmişlerdir.`
        ]);

        this.newLine();

        this.text(`Yapılan görüşmelerde;`);

        this.newLine();

        this.indentedText([
            `Müşteki`,
            ` ${fullName(injured)} 'a`,
            ` uzlaşmak için taleplerini belirtmesinin istenmesi üzerine;`,
            ` "Şüphelinin 1.000 TL vermesi halinde kendisiyle uzlaşmak istiyorum." dedi`
        ]);

        this.indentedText([
            `Şüpheli `,
            ` ${fullName(suspected)} 'a`,
            ` müştekinin uzlaşma talebi iletilmiş ve kendisinin de taleplerini belirtmesinin istenmesi üzerine;`,
            ` "Müştekinin, 1.000 TL vermem halinde uzlaşma isteğini kabul etmiyorum. Bunu ödeme gücüm yoktur. Uzlaşmak istemiyorum" dedi.`
        ]);

        this.newLine();

        const p1 = this.createParagraph();

        this.indentedText([
            `Taraflar özgür iradeleriyle uzlaştıklarını ve birbirlerinden başkaca`,
            ` herhangi bir talepleri olmadığını beyan etmişlerdir. Taraflar arasında`,
            ` CMK. 253. maddesi uyarınca `,
        ], p1);
        this.text('UZLAŞMA GERÇEKLEŞMEMİŞ', p1).bold();
        this.text([
            ` olup, CMK. 253. maddesi gereği "kamu davası" açılacağı hususunda taraflara bilgi verilmiştir`
        ], p1);

        this.indentedText([
            `Taraflara uzlaştırmanın hukuki sonuçları anlatıldıktan sonra taraflar söz alarak`,
            ` "uzlaşmanın hukuki sonuçlarını anladık", demişlerdir. İş bu uzlaştırma raporu hep`,
            ` birlikte imza altına alınmıştır.`
        ]);

        this.newLine();

        const p2 = this.createParagraph();

        this.text(`Uzlaştırma sağlanamadıysa nedenleri:`, p2).bold();
        this.text(` Müştekinin talebi şüpheli tarafından kabul edilmemiştir.`, p2);

        this.newLine();

        this.text(`Yapılan giderler: -`).bold();

        this.newLine();

        this.text('İmzalar', TextAlign.Left).underline().bold();

        ['Sanık', 'Mağdur / Müşteki', 'Müdafi', 'Vekil', 'Kanuni Temsilci', 'Uzlaştırmacı']
            .forEach(lbl => {
                this.text(lbl).bold().underline();
                this.newLine();
            });

        this.text('ONAY ŞERHİ').bold().underline();

        this.newLine();

        ['Tarih', 'Cumhuriyet Savcısı'].forEach(lbl => this.text(lbl).bold);

        this.text('ONAYLAMAMA GEREKÇESİ:').bold().underline();

        this.newLine();

        ['Tarih', 'Cumhuriyet Savcısı'].forEach(lbl => this.text(lbl).bold);
    }

    getPerson(personId: string): Person {
        return this.props.allPersons.find(t => t.id === personId);
    }

    getPersonByPartyType(partyType: PartyType): Person {
        const party = this.props.allParties.find(t => t.type === partyType);
        return this.getPerson(party.personId);
    }

    getAddressByPerson(person: Person): Address {
        const {allAddresses} = this.props;
        return allAddresses.find(t => t.id === person.addressId);
    }

    getCityByAddress(address: Address): City {
        const {allCities} = this.props;
        return allCities.find(t => t.id === address.cityId);
    }

    formatAddress(address: Address): string {
        const city = this.getCityByAddress(address);
        return `${address.fullAddress}, ${address.districtName}, ${city.name}`;
    }

    printAddress(person: Person): string {
        const address = this.getAddressByPerson(person);
        return this.formatAddress(address);
    }
}
