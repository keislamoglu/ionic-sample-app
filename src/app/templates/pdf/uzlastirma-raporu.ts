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
        return {
            canvas: [{
                type: 'line',
                x1: 0, y1: -3,
                x2: 250, y2: -3,
                lineWidth: 1
            }]
        };
    }

    get secondaryUnderline() {
        return {
            canvas: [{
                type: 'line',
                x1: 0, y1: -3,
                x2: 210, y2: -3,
                lineWidth: 1
            }]
        };
    }

    get documentDefinition() {
        return {
            content: [
                {text: 'UZLAŞTIRMA RAPORU', style: ['heading', 'center']},
                this.newLine.repeat(2),
                {
                    stack: [
                        this.printColumns([
                            ['Uzlaştırma No', '[Lorem Ipsum]'],
                            ['Cumhuriyet Başsavcılığı Soruşturma No', '[Dosya No]'],
                            ['Mahkeme Esas No', '[Mahkeme Esas No]'],
                            ['Uzlaştırma Konusu Suç/Suçları', '[Suç/Suçlar]']
                        ], 'primary'),
                        this.newLine,
                        this.printColumns([['Uzlaştırmacının']], 'primary'),
                        this.printColumns([
                            ['Adı ve Soyadı', '[Adı ve Soyadı]'],
                            ['Sicil Numarası', '[Sicil Numarası]'],
                            ['İletişim Adresi', '[İletişim Adresi]']
                        ], 'secondary'),
                        this.newLine,
                        this.printColumns([
                            ['Görevlendirme Tarihi', '[Görevlendirme Tarihi]'],
                            ['Dosya İçindeki Belgelerin Örneğinin Verildiği Uzlaştırma Süresinin Başladığı Tarih', '[Uzl. Süresinin Başlama Tarihi]'],
                            ['Ek Süre Verilme Tarihi ve Süresi', '[Ek Süre Verilme Tarihi ve Süresi]']
                        ], 'primary'),
                        this.printColumns([['Şüphelinin / Sanığın / Kanuni Temsilcisinin']], 'primary'),
                        this.printColumns([
                            ['Adı ve Soyadı', '[Adı ve Soyadı]'],
                            ['T.C. Kimlik Numarası', '[T.C. Kimlik No]'],
                            ['Adresi', '[Adres]'],
                            ['Telefon Numarası', '[Tel No]'],
                        ], 'secondary'),
                        this.printColumns([
                            [`Taraflardan Biri Yabancı Ülkede Oturuyorsa Türkiye'de Göstereceği İkametgahı`, '[Adres]'],
                        ], 'primary'),
                        this.newLine,
                        this.printColumns([
                            [`Taraflardan Biri Yabancı ve Türkiye'de Göstereceği Bir İkametgahı Yok İse Ülkesindeki İkametgahı`, '[Adres]']
                        ], 'primary'),
                        this.printColumns([
                            ['Raporun Düzenlendiği Yer ve Tarih', '[Yer Tarih]']
                        ], 'primary'),
                        this.printColumns([
                            ['Uzlaştırma Süresi', '[Uzlaştırma Süresi]']
                        ], 'primary'),
                        this.printColumns([
                            ['Uzlaştırma Sonucu', '[EDİMSİZ OLARAK UZLAŞMA SAĞLANDI]']
                        ], 'primary'),
                        this.newLine,
                        this.indentedText(`[Cumh. Başs.] Uzlaştırma Bürosu’nun yukarıda numarası  yazılı uzlaştırma dosyası kapsamında;`),
                        this.newLine,
                        this.indentedText(`Taraflar usulüne uygun olarak davet edilmiş ve taraflar bu davete icabet ederek, uzlaşma kurumunun hukuki niteliği, amaç, kapsam ve sonuçları hakkında bilgi aldıktan sonra özgür iradeleriyle uzlaşmayı kabul ettiklerini beyan etmişlerdir.`),
                        this.newLine,
                        this.indentedText(`Yapılan görüşmelerde;`),
                        this.newLine,
                        this.indentedText(`[Lorem Ipsum Dolor Sit Amet]`),
                        this.newLine,
                        this.indentedText(`Taraflar [uzlaştıklarını / uzlaşamadıklarını] beyan etmişlerdir. Taraflar arasında UZLAŞMA [GERÇEKLEŞMİŞ / GERÇEKLEŞMEMİŞ] olup, CMK. 253. ve 254. maddeleri gereği “hükmün açıklanacağı” hususunda taraflara bilgi verilmiştir.`),
                        this.newLine,
                        this.indentedText(`Taraflara uzlaştırmanın hukuki sonuçları anlatıldıktan sonra taraflar söz alarak “uzlaştırmanın hukuki sonuçlarını anladık”, demişlerdir. İş bu uzlaştırma raporu hep birlikte imza altına alınmıştır.`),
                        this.newLine,
                    ]
                },
            ],
            styles: this.defaultStyles
        };
    }

    printColumns(labelValues: Array<[string, string?]>, type: 'primary' | 'secondary') {
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
}
