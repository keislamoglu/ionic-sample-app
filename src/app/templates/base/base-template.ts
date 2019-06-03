import {DocxFileTemplate} from './docx-file-template';

export abstract class BaseTemplate<T = {}> extends DocxFileTemplate {
    constructor(protected props: T) {
        super(props);
    }
}
