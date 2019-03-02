import {Document} from 'docx';

export function applyStyling(doc: Document) {
    doc.Styles.createParagraphStyle('Heading1', 'Heading 1')
        .basedOn('Normal')
        .next('Normal')
        .quickFormat()
        .size(25)
        .bold()
        .center()
        .underline();

    return doc;
}
