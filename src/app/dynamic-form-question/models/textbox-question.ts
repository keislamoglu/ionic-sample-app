import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

export interface TextboxQuestionOptions<K> extends QuestionBaseOptions<K> {
    type?: string;
}

export class TextboxQuestion<K = string> extends QuestionBase<K> {
    controlType: ControlType = 'textbox';
    type: string;

    constructor(options: TextboxQuestionOptions<K> = {}) {
        super(options);
        this.type = options.type || 'text';
    }
}
