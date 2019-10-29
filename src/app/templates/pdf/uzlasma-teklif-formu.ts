/* tslint:disable:max-line-length */
import {BaseTemplate} from './base/base-template';
import {DateQuestion, Question} from '../../dynamic-form-question/models';

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
        return {
            content: [
                this.nl(2),
                {text: 'T.C.', style: 'headingCenter'},
                this.nl(),
                {text: '[.... CUMHURİYET BAŞSAVCILIĞI]', style: 'headingCenter'},
                this.nl(),
                {
                    text: [
                        {text: 'Uzlaştırma No: ', bold: true},
                        {text: '[uzlaştırmaNo]'}
                    ]

                },
                this.nl(),
                {text: 'UZLAŞMA TEKLİF FORMU', style: 'headingCenter'},
                this.nl(),
                {text: [
                        {text: 'A.', bold: true},
                        `5271 sayılı Ceza Muhakemesi Kanunu'nun 253 ve 254 üncü maddeleri çerçevesinde, `,
                        `[soruşturma/kovuşturma]`,
                        ` konusu `,
                        `[crimes]`,
                        ` suçunun/suçlarının uzlaştırmaya tabi olması nedeniyle aşağıda açık kimliği belirtilen kişiye bu formun (D) bölümünde yer alan uzlaştırmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukuki sonuçları `,
                        `[translator] vasıtasıyla`,
                        ` anlatılarak uzlaşma teklifinde bulunulmuştur.`,
                    ], alignment: 'justify'},
                `.../.../....... Saat: .........`,
                this.nl(),
                this.lineSeparator(),
                this.nl(),
                {
                    columns: [
                        {text: `B.UZLAŞMA TEKLİFİ YAPILAN`, style: 'heading'},
                        {text: [
                                {text: ':', bold: true},
                                ` [MÜŞTEKİ/MAĞDUR]`
                            ]}
                    ]
                },
                this.nl(),
                this.lineSeparator(),
                this.nl(),
                {
                    columns: [
                        {text: `C.UZLAŞMA TEKLİFİ YAPILAN KİŞİNİN`, style: 'heading'},
                        {text: `:`, bold: true}
                    ]
                },
                this.nl(),
                {
                    columns: [
                        {stack: [
                                {text: `1. T.C. Kimlik Numarası`},
                                {text: `2. Adı Soyadı`},
                                {text: `3. Baba Adı`},
                                {text: `4. Anne Adı`},
                                {text: `5. Doğum Yeri ve Tarihi`},
                                {text: `6. Adres`},
                                {text: `7. Telefon`},
                            ], width: 145},
                        {stack: new Array(7).fill(':'), width: 5},
                        {stack: [
                                '[tc kimlik no]',
                                '[adı soyadı]',
                                '[baba adı]',
                                '[anne adı]',
                                '[dogum yeri ve tarihi]',
                                '[adres]',
                                '[telefon]'
                            ]}
                    ]
                },
                this.nl(),
                this.lineSeparator(),
                this.nl(),
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
                this.nl(),
                this.lineSeparator(),
                this.nl(),
                {text: `\tUzlaştırmanın mahiyeti, uzlaşmayı kabul veya reddetmenin hukuki sonuçlarını anladım.`, bold: true, preserveLeadingSpaces: true},
                {text: `\tFormun bir örneğini aldım.`, bold: true, preserveLeadingSpaces: true},
                this.nl(),
                this.lineSeparator(),
                this.nl(),
                {text: `Şahsıma yapılan uzlaşma teklifini;`, bold: true},
                this.nl(),
                this.dashLine(),
                this.nl(),
                {
                    columns: [
                        {text: `İnceleyip üç gün içinde beyanda bulunmak istiyorum.`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.nl(),
                this.dashLine(),
                this.nl(),
                {
                    columns: [
                        {text: `Kabul ediyorum`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.nl(),
                this.dashLine(),
                this.nl(),
                {
                    columns: [
                        {text: `Kabul etmiyorum`, width: 360},
                        `.../.../20... Saat: .... İmza`
                    ]
                },
                this.nl(),
                this.dashLine(),
                this.nl(2),
                this.lineSeparator(),
                this.nl(),
                {
                    text: [
                        `Tercüman: `,
                        `[tercüman]`
                    ]
                }

            ],
            styles: {
                heading: {
                    fontSize: 12,
                    bold: true,
                },
                headingCenter: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center'
                }
            }
        };
    }

    hasMultiCrimes(crimes: string = '') {
        return crimes.split(',').length > 1;
    }
}
