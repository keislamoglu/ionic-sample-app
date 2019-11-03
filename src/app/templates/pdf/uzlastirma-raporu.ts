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

    private get emptyRow() {
        return [{colSpan: 4, text: '\n'}];
    }

    get documentDefinition() {
        return {
            content: [
                this.newLine + this.newLine,
                {
                    text: 'UZLAŞTIRMA RAPORU', style: [BaseStyle.Heading, BaseStyle.Center],
                },
                this.newLine,
                {
                    table: {
                        widths: [30, 225, 1, 'auto'],
                        body: [
                            [
                                ...this.printLabel('Uzlaştırma No', {bold: true}),
                                '[Uzlaştırma No]'
                            ],
                            [
                                ...this.printLabel('Cumhuriyet Başsavcılığı Soruşturma No', {bold: true}),
                                '[Dosya No]'
                            ],
                            [
                                ...this.printLabel('Mahkeme Esas No', {bold: true}),
                                '[Mahkeme Esas No]'
                            ],
                            [
                                ...this.printLabel('Uzlaştırma Konusu Suç / Suçlar', {bold: true}),
                                '[Suç/Suçlar]'
                            ],
                            this.emptyRow,
                            [
                                ...this.printLabel('Uzlaştırmacının', {bold: true}),
                                {}
                            ],
                            [
                                ...this.printLabel('Adı ve Soyadı', {indented: true}),
                                '[Adı ve Soyadı]'
                            ],
                            [
                                ...this.printLabel('Sicil Numarası', {indented: true}),
                                '[Sicil Numarası]'
                            ],
                            [
                                ...this.printLabel('İletişim Adresi', {indented: true}),
                                {text: '[İletişim Adresi]', rowSpan: 2}
                            ],
                            this.emptyRow,
                            [
                                ...this.printLabel('Görevlendirme Tarihi', {bold: true}),
                                '[Görevlendirme Tarihi]'
                            ],
                            [
                                ...this.printLabel('Dosya İçindeki Belgelerin Örneğinin Verildiği Uzlaştırma Süresinin Başladığı Tarih', {bold: true}),
                                '\n[Tarih]'
                            ],
                            [
                                ...this.printLabel('Ek Süre Verilme Tarihi ve Süresi', {bold: true}),
                                '[Ek süre]'
                            ],
                            [
                                ...this.printLabel('Şüphelinin / Sanığın / Kanuni Temsilcisinin', {bold: true}),
                                {}
                            ],
                            [
                                ...this.printLabel('Adı ve Soyadı', {indented: true}),
                                '[Adı ve Soyadı]'
                            ],
                            [
                                ...this.printLabel('T.C. Kimlik Numarası', {indented: true}),
                                '[TC No]'
                            ],
                            [
                                ...this.printLabel('Adresi', {indented: true}),
                                {text: '[Adresi]', rowSpan: 2}
                            ],
                            this.emptyRow,
                            [
                                ...this.printLabel('Telefon Numarası', {indented: true}),
                                '[Tel No]'
                            ],
                            [
                                ...this.printLabel(`Taraflardan Biri Yabancı Ülkede Oturuyorsa Türkiye'de Göstereceği İkametgahı`, {bold: true}),
                                {text: '[İkametgah]', rowSpan: 2}

                            ],
                            [
                                ...this.printLabel(`Taraflardan Biri Yabancı ve Türkiye’de Göstereceği Bir İkametgahı Yok İse Ülkesindeki İkametgahı`, {bold: true}),
                                {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id erat non ', rowSpan: 3}
                            ],
                            this.emptyRow,
                            [
                                ...this.printLabel('Raporun Düzenlendiği Yer ve Tarih', {bold: true}),
                                '[rapor tarihi ve yeri]'
                            ],
                            [
                                ...this.printLabel('Uzlaştırma Süresi', {bold: true}),
                                '[Uzlaştırma Süresi]'
                            ],
                            [
                                ...this.printLabel('Uzlaştırma Sonucu', {bold: true}),
                                '[EDİMSİZ OLARAK UZLAŞMA SAĞLANDI]'
                            ]
                        ],
                    },
                    layout: {
                        defaultBorder: false
                    }
                }
            ],
            styles: this.defaultStyles

        };

    }

    printLabel(text, options: { bold?: boolean, indented?: boolean } = {}) {
        const _options = {
            bold: false,
            indented: false,
            ...options
        };
        const label = {
            colSpan: _options.indented ? 1 : 2,
            text: text,
            border: [false, false, false, true],
            marginLeft: -4,
            bold: _options.bold
        };
        const colonText = (text.length / 50) > 1
            ? `${'\n'.repeat(Math.floor(text.length / 50))}:`
            : ':';
        const colon = {
            text: colonText,
            border: [false, false, false, true],
            marginRight: -4,
            alignment: 'right',
            bold: _options.bold,
        };

        return _options.indented
            ? [{}, label, colon]
            : [label, {}, colon];
    }
}
