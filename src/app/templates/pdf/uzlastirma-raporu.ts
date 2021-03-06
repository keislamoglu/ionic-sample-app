/* tslint:disable:max-line-length */
import {BaseStyle, BaseTemplate} from './base/base-template';
import {DateQuestion, DropdownQuestion, Question, TextareaQuestion, TextboxQuestion} from '../../dynamic-form-question/models';
import {CaseFileType, ExtensionTime, Party, PartyType} from '../../shared/entity';
import {fullName, isDomestic, printAddress, printDate} from '../../shared/helpers';

export interface UzlastirmaRaporuProps {
    date: string;
    place: string;
    conciliationResult: number;
    conciliationDuration: string;
    reportText: string;
    execution: string;
    failedConciliationPurpose: string;
    expenses: string;
}

const conciliationResults = [
    'UZLAŞMA SAĞLANAMADI',
    'UZLAŞMA SAĞLANDI',
    'EDİMLİ UZLAŞMA SAĞLANDI',
    'EDİMSİZ OLARAK UZLAŞMA SAĞLANDI',
    'KISMİ UZLAŞMA SAĞLANDI'
];

type propsType = keyof UzlastirmaRaporuProps;

export const UzlastirmaRaporuQuestions: Question[] = [
    new DateQuestion<propsType>({
        key: 'date',
        label: 'Raporun düzenlendiği tarih',
        required: true,
    }),
    new TextboxQuestion<propsType>({
        key: 'conciliationDuration',
        label: 'Uzlaştırma süresi (gün)',
        type: 'number',
        required: true
    }),
    new TextboxQuestion<propsType>({
        key: 'place',
        label: 'Raporun düzenlendiği yer',
        required: true,
    }),
    new DropdownQuestion<propsType>({
        key: 'conciliationResult',
        label: 'Uzlaştırma Sonucu',
        required: true,
        options: [
            {key: 0, value: conciliationResults[0]},
            {key: 1, value: conciliationResults[1]},
            {key: 2, value: conciliationResults[2]},
            {key: 3, value: conciliationResults[3]},
            {key: 4, value: conciliationResults[4]}
        ]
    }),
    new TextareaQuestion<propsType>({
        key: 'reportText',
        label: 'Rapor yazısı',
        required: true
    }),
    new TextareaQuestion<propsType>({
        key: 'execution',
        label: 'Edim, edimin yerine getirilme şekli ve zamanı',
    }),
    new TextareaQuestion<propsType>({
        key: 'failedConciliationPurpose',
        label: 'Başarısız olduysa nedenleri',
    }),
    new TextareaQuestion<propsType>({
        key: 'expenses',
        label: 'Yapılan giderler'
    })
];

export class UzlastirmaRaporu extends BaseTemplate<UzlastirmaRaporuProps> {
    get primaryUnderline() {
        return this.drawUnderline(250);
    }

    get secondaryUnderline() {
        return this.drawUnderline(210);
    }

    get isInvestigation() {
        return this.props.petition.caseFile.type === CaseFileType.Investigation;
    }

    get partyTypeNameMapping(): Partial<Record<PartyType, string>> {
        return {
            [PartyType.Advocate]: 'Müdafinin',
            [PartyType.AffectedByCrime]: 'Suçtan Zarar Görenin',
            [PartyType.Representative]: 'Vekilin',
            [PartyType.Translator]: 'Tercümanın',
            [PartyType.LegalDelegate]: 'Kanuni Temsilcisinin',
            ...(this.isInvestigation ? {
                [PartyType.Injured]: 'Mağdurun',
                [PartyType.Suspected]: 'Şüphelinin',
            } : {
                [PartyType.Intervening]: 'Katılanın',
                [PartyType.Defendant]: 'Sanığın'
            })
        };
    }

    get realParties(): Party[] {
        return this.props.petition.caseFile.parties.filter(t => !t.relatedPersonId);
    }

    get extensionTime(): ExtensionTime | null {
        const {extensionTimes} = this.props.petition.caseFile;

        return !!extensionTimes.length ? extensionTimes[0] : null;
    }

    get documentDefinition() {
        const {petition, conciliator, extraData} = this.props;
        const {caseFile} = petition;
        const partyTypeHavingCrimes = {
            [CaseFileType.Investigation]: PartyType.Suspected,
            [CaseFileType.Prosecution]: PartyType.Defendant
        }[caseFile.type];
        const crimes = caseFile.parties.find(p => p.type === partyTypeHavingCrimes).crimes;
        const isPartiesConciliated = extraData.conciliationResult > 0;
        const partySituatedAtForeign = this.realParties.filter(t => !t.person.isForeigner).find(t => !isDomestic(t.person.address) && !!t.person.mernisAddress);
        const partyLivingAtForeign = this.realParties.find(t => t.person.isForeigner && !isDomestic(t.person.address) && !t.person.mernisAddress);

        return {
            content: [
                {text: 'UZLAŞTIRMA RAPORU', style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine.repeat(2),
                {
                    stack: [
                        this.printColumns([
                            ['Uzlaştırma No', caseFile.conciliationNo],
                            [this.isInvestigation ? 'Cumhuriyet Başsavcılığı Soruşturma No' : 'Mahkeme Esas No', caseFile.fileNo],
                            ['Uzlaştırma Konusu Suç/Suçları', crimes]
                        ]),
                        this.newLine,
                        this.printColumns([['Uzlaştırmacının']]),
                        this.printColumns([
                            ['Adı ve Soyadı', fullName(conciliator)],
                            ['Sicil Numarası', conciliator.registrationNo],
                            ['İletişim Adresi', conciliator.address]
                        ], 'secondary'),
                        this.newLine,
                        this.printColumns([
                            ['Görevlendirme Tarihi', caseFile.chargeDate],
                            ['Dosya İçindeki Belgelerin Örneğinin Verildiği Uzlaştırma Süresinin Başladığı Tarih', caseFile.conciliationStartDate],
                            ['Ek Süre Verilme Tarihi ve Süresi', this.extensionTime ? `${printDate(this.extensionTime.date)}, ${this.extensionTime.duration} gün` : '-']
                        ]),
                        ...[].concat(...caseFile.parties.map(party => {
                            let partyName = this.partyTypeNameMapping[party.type];

                            if ([PartyType.LegalDelegate,
                                PartyType.Representative,
                                PartyType.Advocate,
                                PartyType.Translator].includes(party.type)) {
                                partyName += ` (${fullName(party.relatedPerson)})`;
                            }

                            return [
                                this.printColumns([[partyName]]),
                                this.printColumns([
                                    ['Adı ve Soyadı', fullName(party.person)],
                                    ['T.C. Kimlik Numarası', party.person.identificationNo],
                                    ['Adresi', printAddress(party.person.address)],
                                    ['Telefon Numarası', party.person.phone]
                                ], 'secondary')
                            ];
                        })),
                        this.printColumns([
                            [`Taraflardan Biri Yabancı Ülkede Oturuyorsa Türkiye'de Göstereceği İkametgahı`, partySituatedAtForeign ? printAddress(partySituatedAtForeign.person.mernisAddress) : ''],
                        ]),
                        this.newLine,
                        this.printColumns([
                            [`Taraflardan Biri Yabancı ve Türkiye'de Göstereceği Bir İkametgahı Yok İse Ülkesindeki İkametgahı`, partyLivingAtForeign ? printAddress(partyLivingAtForeign.person.address) : '']
                        ]),
                        this.printColumns([
                            ['Raporun Düzenlendiği Yer ve Tarih', `${extraData.place} ${printDate(extraData.date)}`]
                        ]),
                        this.printColumns([
                            ['Uzlaştırma Süresi', `${extraData.conciliationDuration} gün`]
                        ]),
                        this.printColumns([
                            ['Uzlaştırma Sonucu', conciliationResults[extraData.conciliationResult]]
                        ])
                    ]
                },
                this.newLine,
                this.indentedText(`${caseFile.attorneyGeneralship.name} Uzlaştırma Bürosu’nun yukarıda numarası yazılı uzlaştırma dosyası kapsamında;`),
                this.newLine,
                this.indentedText(`Taraflar usulüne uygun olarak davet edilmiş ve taraflar bu davete icabet ederek, uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve sonuçları hakkında bilgi aldıktan sonra özgür iradeleriyle uzlaşmayı kabul ettiklerini beyan etmişlerdir.`),
                this.newLine,
                this.indentedText(`Yapılan görüşmelerde;`),
                this.newLine,
                this.indentedText(extraData.reportText),
                this.newLine,
                this.indentedText(`Taraflar ${isPartiesConciliated ? 'uzlaştıklarını' : 'uzlaşamadıklarını'} beyan etmişlerdir. Taraflar arasında UZLAŞMA ${isPartiesConciliated ? 'GERÇEKLEŞMİŞ' : 'GERÇEKLEŞMEMİŞ'} olup, CMK. 253. ve 254. maddeleri gereği “hükmün açıklanacağı” hususunda taraflara bilgi verilmiştir.`),
                this.newLine,
                this.indentedText(`Taraflara uzlaştırmanın hukuki sonuçları anlatıldıktan sonra taraflar söz alarak “uzlaştırmanın hukuki sonuçlarını anladık”, demişlerdir. İş bu uzlaştırma raporu hep birlikte imza altına alınmıştır.`),
                this.newLine,
                {
                    columns: [
                        {
                            stack: [
                                'Tarafların üzerindeki anlaştıkları edim, edimin yerine getirilme şekli ve zamanı',
                                this.drawUnderline(450)
                            ],
                            lineHeight: 1.2,
                            width: 447,
                            bold: true
                        },
                        [{text: ':', bold: true, width: 5}]
                    ]
                },
                this.newLine,
                extraData.execution,
                this.newLine,
                {
                    columns: [
                        {
                            stack: [
                                'Uzlaştırma başarısızlıkla sonuçlanması halinde nedenleri',
                                this.drawUnderline(450)
                            ],
                            lineHeight: 1.2,
                            width: 447,
                            bold: true
                        },
                        [{text: ':', bold: true, width: 5}]
                    ]
                },
                this.newLine,
                extraData.failedConciliationPurpose,
                this.newLine,
                this.printColumns([
                    ['Yapılan Giderler']
                ]),
                this.newLine,
                extraData.expenses,
                this.newLine.repeat(3),
                {
                    text: 'İmzalar',
                    bold: true,
                    decoration: 'underline',
                    alignment: 'right',
                    margin: [0, 0, 75, 0]
                },
                this.newLine,
                {
                    stack: [
                        this.printColumns([['Şüpheli / Sanık']]),
                        this.newLine,
                        this.printColumns([['Mağdur / Katılan']]),
                        this.newLine,
                        this.printColumns([['Suçtan Zarar Gören']]),
                        this.newLine,
                        this.printColumns([['Müdafi']]),
                        this.newLine,
                        this.printColumns([['Vekil']]),
                        this.newLine,
                        this.printColumns([['Kanuni Temsilci']]),
                        this.newLine,
                        this.printColumns([['Uzlaştırmacı']]),
                        this.newLine,
                        this.printColumns([['Tercüman']]),
                        this.newLine,
                    ]
                },
                this.newLine.repeat(2),
                {text: 'ONAY ŞERHİ', style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine,
                {text: 'Tarih, Mühür ve İmza', style: [BaseStyle.Heading, BaseStyle.Center]},
                {
                    text: this.isInvestigation ? 'Cumhuriyet Savcısı' : 'Hakim',
                    style: [BaseStyle.Heading, BaseStyle.Center]
                },
                this.newLine.repeat(3),
                this.printColumns([['ONAYLAMA GEREKÇESİ']]),
                this.newLine.repeat(3),
                {text: 'Tarih, Mühür ve İmza', style: [BaseStyle.Heading, BaseStyle.Center]},
                {
                    text: this.isInvestigation ? 'Cumhuriyet Savcısı' : 'Hakim',
                    style: [BaseStyle.Heading, BaseStyle.Center]
                },
            ],
            styles: this.defaultStyles
        };
    }

    printColumns(labelValues: Array<[string, string?]>, type: 'primary' | 'secondary' = 'primary') {
        const isPrimary = type === 'primary';
        const lineHeight = 1.2;
        const maxLineLength = 50;
        const lineCount = (t: string) => Math.floor(new Blob([t]).size / maxLineLength);
        const labels = labelValues.map(t => t[0]);
        const values = labelValues.map(t => t[1]);
        const labelStack = {
            stack: [...Object.values(labels.map((label, index) => [
                lineCount(values[index]) > lineCount(label) ? this.newLine.repeat(lineCount(values[index]) - lineCount(label)) : void 0,
                label,
                isPrimary ? this.primaryUnderline : this.secondaryUnderline
            ]))],
            lineHeight,
            width: isPrimary ? 247 : 207,
            bold: isPrimary
        };
        const colonStack = {
            stack: labels.map((label, index) => `${this.newLine.repeat(Math.max(lineCount(label), lineCount(values[index])))}:`),
            lineHeight,
            width: 5
        };
        const valueStack = {
            stack: values.map((value = '', index) => lineCount(labels[index]) > lineCount(value) ? this.newLine.repeat(lineCount(labels[index]) - lineCount(value)) + value : value),
            lineHeight
        };

        return {
            columns: [labelStack, colonStack, valueStack],
            margin: isPrimary ? [] : [40, 0, 0, 0]
        };
    }

    drawUnderline(width: number) {
        return {
            canvas: [{
                type: 'line',
                x1: 0, y1: -3,
                x2: width, y2: -3,
                lineWidth: 1
            }]
        };
    }

    placeholder(length = 40) {
        return '.'.repeat(length);
    }

}
