import {DocxFileTemplate} from './docx-file-template';

export abstract class BaseTemplate<T = {}> extends DocxFileTemplate {
    constructor(protected props: T) {
        super(props);
    }

    protected printLabelValue(labelValueArray: Array<string[]>): void {
        labelValueArray.forEach(([label, value]) => {
            const p = this.createP();
            this.addText(`${label}: `, p).bold();
            this.addText(value, p);
        });
    }

    protected printDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString();
    }

    protected printTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString();
    }
}
