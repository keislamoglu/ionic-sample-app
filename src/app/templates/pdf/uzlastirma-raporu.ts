/* tslint:disable:max-line-length */
import {BaseStyle, BaseTemplate} from './base/base-template';
import {DateQuestion, Question} from '../../dynamic-form-question/models';

export interface UzlastirmaRaporuProps {
    date: string;
}

export const UzlastirmaRaporuQuestions: Question[] = [
    new DateQuestion({
        key: 'date',
        label: 'Tarih',
        required: true,
    })
];

export class UzlastirmaRaporu extends BaseTemplate {
    get primaryUnderline() {
        return this.drawUnderline(250);
    }

    get secondaryUnderline() {
        return this.drawUnderline(210);
    }

    get documentDefinition() {
        return {
            content: [
                {text: 'UZLAŞTIRMA RAPORU', style: [BaseStyle.Heading, BaseStyle.Center]},
                this.newLine.repeat(2),
                {
                    stack: [
                        this.printColumns([
                            ['Uzlaştırma No', this.placeholder()],
                            ['Cumhuriyet Başsavcılığı Soruşturma No', this.placeholder()],
                            ['Mahkeme Esas No', this.placeholder()],
                            ['Uzlaştırma Konusu Suç/Suçları', this.placeholder()]
                        ]),
                        this.newLine,
                        this.printColumns([['Uzlaştırmacının']]),
                        this.printColumns([
                            ['Adı ve Soyadı', this.placeholder()],
                            ['Sicil Numarası', this.placeholder()],
                            ['İletişim Adresi', this.placeholder()]
                        ], 'secondary'),
                        this.newLine,
                        this.printColumns([
                            ['Görevlendirme Tarihi', this.placeholder()],
                            ['Dosya İçindeki Belgelerin Örneğinin Verildiği Uzlaştırma Süresinin Başladığı Tarih', this.placeholder()],
                            ['Ek Süre Verilme Tarihi ve Süresi', this.placeholder()]
                        ]),
                        this.printColumns([['Şüphelinin / Sanığın / Kanuni Temsilcisinin']]),
                        this.printColumns([
                            ['Adı ve Soyadı', this.placeholder()],
                            ['T.C. Kimlik Numarası', this.placeholder()],
                            ['Adresi', this.placeholder()],
                            ['Telefon Numarası', this.placeholder()],
                        ], 'secondary'),
                        this.printColumns([
                            [`Taraflardan Biri Yabancı Ülkede Oturuyorsa Türkiye'de Göstereceği İkametgahı`, this.placeholder()],
                        ]),
                        this.newLine,
                        this.printColumns([
                            [`Taraflardan Biri Yabancı ve Türkiye'de Göstereceği Bir İkametgahı Yok İse Ülkesindeki İkametgahı`, this.placeholder()]
                        ]),
                        this.printColumns([
                            ['Raporun Düzenlendiği Yer ve Tarih', this.placeholder()]
                        ]),
                        this.printColumns([
                            ['Uzlaştırma Süresi', this.placeholder()]
                        ]),
                        this.printColumns([
                            ['Uzlaştırma Sonucu', '[EDİMSİZ OLARAK UZLAŞMA SAĞLANDI]']
                        ])
                    ]
                },
                this.newLine,
                this.indentedText(`[Cumh. Başs.] Uzlaştırma Bürosu’nun yukarıda numarası  yazılı uzlaştırma dosyası kapsamında;`),
                this.newLine,
                this.indentedText(`Taraflar usulüne uygun olarak davet edilmiş ve taraflar bu davete icabet ederek, uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve sonuçları hakkında bilgi aldıktan sonra özgür iradeleriyle uzlaşmayı kabul ettiklerini beyan etmişlerdir.`),
                this.newLine,
                this.indentedText(`Yapılan görüşmelerde;`),
                this.newLine,
                this.indentedText(this.placeholder(500)),
                this.newLine,
                this.indentedText(`Taraflar [uzlaştıklarını / uzlaşamadıklarını] beyan etmişlerdir. Taraflar arasında UZLAŞMA [GERÇEKLEŞMİŞ / GERÇEKLEŞMEMİŞ] olup, CMK. 253. ve 254. maddeleri gereği “hükmün açıklanacağı” hususunda taraflara bilgi verilmiştir.`),
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
                this.placeholder(500),
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
                this.placeholder(500),
                this.newLine,
                this.printColumns([
                    ['Yapılan Giderler']
                ]),
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
                {text: '[Cumhuriyet Savcısı / Hakim]', style: [BaseStyle.Heading, BaseStyle.Center]},
                {text: this.placeholder(), style: [BaseStyle.Center]},
                this.newLine.repeat(3),
                this.printColumns([['ONAYLAMA GEREKÇESİ']]),
                this.newLine.repeat(3),
                {text: 'Tarih, Mühür ve İmza', style: [BaseStyle.Heading, BaseStyle.Center]},
                {text: '[Cumhuriyet Savcısı / Hakim]', style: [BaseStyle.Heading, BaseStyle.Center]},
                {text: this.placeholder(), style: [BaseStyle.Center]},
            ],
            styles: this.defaultStyles
        };
    }

    printColumns(labelValues: Array<[string, string?]>, type: 'primary' | 'secondary' = 'primary') {
        const isPrimary = type === 'primary';
        const lineHeight = 1.2;
        const maxLineLength = 50;
        const calcNewLineCount = (t: string) => Math.floor(new Blob([t]).size / maxLineLength);
        const isExceededMaxLength = (text) => text.length > 50;
        const labels = labelValues.map(t => t[0]);
        const values = labelValues.map(t => t[1]);
        const labelStack = {
            stack: [...Object.values(labels.map(t => [t, isPrimary ? this.primaryUnderline : this.secondaryUnderline]))],
            lineHeight,
            width: isPrimary ? 247 : 207,
            bold: isPrimary
        };
        const colonStack = {
            stack: labels.map(t => isExceededMaxLength(t) ? this.newLine.repeat(calcNewLineCount(t)) + ':' : ':'),
            lineHeight,
            width: 5
        };
        const valueStack = {
            stack: values.map((t = '', index) => isExceededMaxLength(labels[index]) ? this.newLine.repeat(calcNewLineCount(labels[index])) + t : t),
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
