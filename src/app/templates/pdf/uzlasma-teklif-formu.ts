/* tslint:disable:max-line-length */
import {BaseStyle, BaseTemplate} from './base/base-template';
import {DateQuestion, Question} from '../../dynamic-form-question/models';
import {CaseFileType, PartyType} from '../../shared/entity';
import {fullName, printAddress, printDate, printTime} from '../../shared/helpers';

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
    get documentDefinition() {
        const {petition, extraData} = this.props;
        const {caseFile} = petition;
        const [party] = petition.parties;
        const competentAuthority = caseFile.type === CaseFileType.Investigation
            ? caseFile.attorneyGeneralship
            : caseFile.courtHouse;
        const partyTypeHavingCrimes = {
            [CaseFileType.Investigation]: PartyType.Suspected,
            [CaseFileType.Prosecution]: PartyType.Defendant
        }[caseFile.type];
        const crimes = caseFile.parties.find(p => p.type === partyTypeHavingCrimes).crimes;
        const translator = caseFile.parties.find(t => t.type === PartyType.Translator && t.relatedPersonId === party.personId);

        return {
            content: [
                this.newLine + this.newLine,
                {text: 'T.C.', style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine,
                {text: competentAuthority.name, style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine,
                {
                    text: [
                        {text: 'Uzlaştırma No: ', bold: true},
                        caseFile.conciliationNo
                    ]
                },
                this.newLine,
                {text: 'UZLAŞMA TEKLİF FORMU', style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine,
                {
                    text: [
                        {text: 'A.', bold: true},
                        `5271 sayılı Ceza Muhakemesi Kanunu'nun 253 ve 254 üncü maddeleri çerçevesinde, `,
                        caseFile.type,
                        ` konusu `,
                        crimes,
                        ` ${this.hasMultiCrimes(crimes) ? 'suçlarının' : 'suçunun'}`,
                        ` uzlaştırmaya tabi olması nedeniyle aşağıda açık kimliği belirtilen kişiye bu formun (D) bölümünde yer alan uzlaştırmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukuki sonuçları`,
                        translator ? ` Tercüman ${fullName(translator.person)} vasıtasıyla` : ``,
                        ` anlatılarak uzlaşma teklifinde bulunulmuştur.`,
                    ], alignment: 'justify'
                },
                `${printDate(extraData.date)} Saat: ${printTime(extraData.date)}`,
                this.newLine,
                this.lineSeparator,
                this.newLine,
                {
                    columns: [
                        {text: `B.UZLAŞMA TEKLİFİ YAPILAN`, style: BaseStyle.Heading},
                        {
                            text: [
                                {text: ':', bold: true},
                                ` ${party.type.toLocaleUpperCase()}`
                            ]
                        }
                    ]
                },
                this.newLine,
                this.lineSeparator,
                this.newLine,
                {
                    columns: [
                        {text: `C.UZLAŞMA TEKLİFİ YAPILAN KİŞİNİN`, style: BaseStyle.Heading},
                        {text: `:`, bold: true}
                    ]
                },
                this.newLine,
                {
                    columns: [
                        {
                            ol: [
                                `T.C. Kimlik Numarası`,
                                `Adı Soyadı`,
                                `Baba Adı`,
                                `Anne Adı`,
                                `Doğum Yeri ve Tarihi`,
                                `Adres`,
                                `Telefon`,
                            ], width: 145
                        },
                        {stack: ':'.repeat(7).split(''), width: 5},
                        {
                            stack: [
                                party.person.identificationNo,
                                `${party.person.name} ${party.person.lastName}`,
                                party.person.fatherName,
                                party.person.motherName,
                                `${printDate(party.person.birthDate)}, ${party.person.birthPlace}`,
                                printAddress(party.person.address),
                                party.person.phone
                            ]
                        }
                    ]
                },
                this.newLine,
                this.lineSeparator,
                this.newLine,
                {text: `D.Uzlaştırmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukuki sonuçları :`, bold: true},
                {
                    ol: [
                        `Uzlaşma, tarafların özgür iradeleriyle belirleyeceği edim karşılığında veya edimsiz olarak anlaşmalarıdır.`,
                        `Uzlaştırma süreci tarafların kabulüyle başlar, taraflardan biri kabul etmezse süreç işlemez. Taraflar uzlaşma sağlanana kadar bu yöndeki iradelerinden her zaman vazgeçebilirler.`,
                        `Şüpheli/sanık ile mağdur/katılan veya suçtan zarar gören arasındaki uzlaştırmada esas hakkındaki kararı taraflar kendileri verirler.`,
                        `Uzlaştırmacı, Cumhuriyet başsavcılığı uzlaştırma bürosu tarafından görevlendirilen tarafsız ve bağımsız bir kişidir. Uzlaştırmacı sadece görüşmelerin yürütülmesini kolaylaştırır.`,
                        `Uzlaştırmacı taraflara uzlaştırma süreciyle ilgili ayrıntılı bilgilendirme yapar, hak ve yükümlülüklerini anlatır ve tarafların uzlaştırmaya ilişkin sorularını cevaplandırır. `,
                        `Uzlaştırma ücreti ve giderlerinden mağdur/katılan veya suçtan zarar gören hiçbir şekilde sorumlu değildir.`,
                        `Uzlaşmanın sağlanması hâlinde, şüpheli ya da sanık uzlaştırma giderlerini ödemez. Bu giderler Devlet Hazinesi’nden karşılanır.`,
                        `Uzlaşma teklifinden itibaren üç gün içinde kararın uzlaştırmacıya bildirilmemesi hâlinde, teklif reddedilmiş sayılır.`,
                        `Uzlaştırma müzakereleri gizli olarak yürütülür. Uzlaştırma müzakereleri sırasında tarafların konuyla ilgili olarak yapacakları açıklamalar mevcut soruşturmada ve disiplinle ilgili olanlar da dâhil olmak üzere, hiçbir soruşturma ve kovuşturmada ya da davada delil olarak kullanılamaz, herhangi bir yerde açıklanamaz.`,
                        `Uzlaşma teklif formu ile uzlaştırma raporu taraflarca imzalanır.`,
                        `Mağdur ya da suçtan zarar görenin uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi yapması, haklarından vazgeçtiği anlamına gelmez.`,
                        `Şüpheli ya da sanığın uzlaşma teklifini kabul etmesi ve uzlaştırma görüşmesi yapması suçu kabul ettiği anlamına gelmez.`,
                        `Uzlaştırma müzakerelerine; uzlaştırmacı, taraflar ile bunların kanunî temsilcileri, müdafi ve vekili katılabilir.`,
                        `Taraflardan herhangi birinin uzlaştırma görüşmelerine katılmaması hâlinde uzlaşma kabul edilmemiş sayılır.`,
                        `Uzlaşmanın sağlanması hâlinde mağdur, yargılama sürecine girmeksizin uzlaşma sonucu belirlenen haklarını alır.`,
                        `Uzlaşmanın sağlanması hâlinde mağdur, soruşturma/kovuşturma konusu suç nedeniyle tazminat davası açamaz, açılmış bir dava varsa feragat etmiş sayılır.`,
                        `Soruşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi hâlinde, şüpheli hakkında kovuşturmaya yer olmadığına dair karar verilir ve adlî sicile kaydedilmez. Aksi hâlde kamu davası açılır.`,
                        `Kovuşturma evresinde uzlaşmanın gerçekleşmesi ve edimin yerine getirilmesi hâlinde, sanık hakkında düşme kararı verilir ve adlî sicile kaydedilmez. Aksi hâlde yargılamaya devam olunur.`,
                        `Şüpheli ya da sanığın edimini yerine getirmemesi hâlinde uzlaştırma raporu veya uzlaşma belgesi, 2004 sayılı İcra ve İflas Kanunu’nun 38 inci maddesinde yazılı ilâm mahiyetinde belgelerden sayılır. Bu belge mahkeme kararı gibi icra olunur.`
                    ]
                },
                this.newLine,
                this.lineSeparator,
                this.newLine,
                this.indentedText({
                    text: `Uzlaştırmanın mahiyeti, uzlaşmayı kabul veya reddetmenin hukuki sonuçlarını anladım.`,
                    bold: true
                }),
                this.indentedText({text: `Formun bir örneğini aldım.`, bold: true}),
                this.newLine,
                this.lineSeparator,
                this.newLine,
                {text: `Şahsıma yapılan uzlaşma teklifini;`, bold: true},
                this.newLine,
                this.dashedLine,
                this.newLine,
                {
                    columns: [
                        {text: `İnceleyip üç gün içinde beyanda bulunmak istiyorum.`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.newLine,
                this.dashedLine,
                this.newLine,
                {
                    columns: [
                        {text: `Kabul ediyorum`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.newLine,
                this.dashedLine,
                this.newLine,
                {
                    columns: [
                        {text: `Kabul etmiyorum`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.newLine,
                this.dashedLine,
                this.newLine + this.newLine,
                this.lineSeparator,
                this.newLine,
                translator ? {
                    text: [
                        `Tercüman: `,
                        fullName(translator.person)
                    ]
                } : ''

            ],
            styles: this.defaultStyles
        };
    }

    hasMultiCrimes(crimes: string = '') {
        return crimes.split(',').length > 1;
    }
}
