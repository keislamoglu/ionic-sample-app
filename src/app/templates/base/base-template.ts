import {DocxFileTemplate} from './docx-file-template';

export abstract class BaseTemplate<T = {}> extends DocxFileTemplate {
    constructor(protected props: T) {
        super(props);
    }

    protected printLabelValue(labelValueArray: Array<string[]>): void {
        for (const [label, value] of labelValueArray) {
            const p = this.createP();
            this.addText(`${label}: `, p).bold();

            if (value) {
                this.addText(value, p);
            }
        }
    }

    protected printIndentedLabelValue(labelValueArray: Array<string[]>, offset = 1): void {
        for (const [label, value] of labelValueArray) {
            const p = this.createP();
            const text = this.addText(`${label}: `, p);

            for (let i = 0; i < offset; i++) {
                text.tab();
            }

            this.addText(value, p);
        }
    }

    protected printDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString();
    }

    protected printTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString();
    }
}
