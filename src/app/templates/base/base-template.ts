import {DocxFileTemplate} from './docx-file-template';

export abstract class BaseTemplate<T = {}> extends DocxFileTemplate {
    constructor(protected props: T) {
        super(props);
    }

    protected printLabelValue(labelValueArray: Array<string[]>): void {
        for (const [label, value] of labelValueArray) {
            const p = this.createParagraph();
            this.text(`${label}: `, p).bold();

            if (value) {
                this.text(value, p);
            }
        }
    }

    protected printIndentedLabelValue(labelValueArray: Array<string[]>, offset = 1): void {
        for (const [label, value] of labelValueArray) {
            const p = this.createParagraph();
            const text = this.text(`${label}: `, p);

            for (let i = 0; i < offset; i++) {
                text.tab();
            }

            this.text(value, p);
        }
    }

    protected printLikeTable(labelValueArray: Array<string[]>, headerFirstRow = true) {
        labelValueArray.forEach((rowItems, index) => {
            const tabCount = 12 / rowItems.length;
            const [firstItem, ...restItems] = rowItems;
            const p = this.createParagraph();

            const firstItemText = this.text(firstItem, p);

            if (headerFirstRow && index === 0) {
                firstItemText.bold();
            }

            for (const item of restItems) {
                const text = this.text(item, p);

                for (let i = 0; i < tabCount; i++) {
                    text.tab();
                }
            }
        });
    }

    protected printDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString();
    }

    protected printTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString();
    }
}
