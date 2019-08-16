import {Document, Paragraph, Run} from 'docx';


export enum TextAlign {
    Left, Right, Center, Justified
}

export abstract class DocxFileTemplate {
    protected doc = new Document();

    constructor(protected props: any) {
        this.prepareDocument(props);
    }

    protected abstract prepareDocument(props: any);

    protected createParagraph(): Paragraph {
        return this.doc.createParagraph();
    }

    protected indentedText(text: string | string[], textAlignOrParagraph?: TextAlign | Paragraph): Run {
        return this.text(text, textAlignOrParagraph).tab();
    }

    protected text(text: string | string[], textAlignOrParagraph?: TextAlign | Paragraph): Run {
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
            case TextAlign.Justified:
                p.justified();
                break;
            default:
                p.left();
        }

        if (Array.isArray(text)) {
            text = text.join('');
        }

        return p.createTextRun(text).font('Arial');
    }

    protected newLine(times = 1) {
        for (let i = 0; i < times; i++) {
            this.doc.createParagraph().createTextRun('').font('Arial').break();
        }
    }

    getDocument(): Document {
        return this.doc;
    }
}
