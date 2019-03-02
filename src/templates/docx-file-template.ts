import {Document, Paragraph} from 'docx';


export enum TextAlign {
    Left, Right, Center
}

export abstract class DocxFileTemplate<T> {
    protected doc = new Document();

    constructor(protected props: T) {
        this.prepareDocument();
    }

    protected abstract prepareDocument();

    protected createP() {
        return this.doc.createParagraph();
    }

    protected addText(text: string, textAlignOrParagraph?: TextAlign | Paragraph) {
        let paragraph;
        let align;
        if (textAlignOrParagraph instanceof Paragraph) {
            paragraph = textAlignOrParagraph;
        } else {
            align = textAlignOrParagraph;
        }
        const p = paragraph || this.doc.createParagraph();
        switch (align) {
            case TextAlign.Left:
                p.left();
                break;
            case TextAlign.Right:
                p.right();
                break;
            case TextAlign.Center:
                p.center();
                break;
            default:
                p.left();
        }
        return p.createTextRun(text).font('Arial');
    }

    getDocument() {
        return this.doc;
    }
}