import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

export interface TextboxQuestionOptions extends QuestionBaseOptions<string> {
    type?: string;
}

export class TextboxQuestion extends QuestionBase<string> {
    controlType: ControlType = 'textbox';
    type: string;

    constructor(options: TextboxQuestionOptions = {}) {
        super(options);
        this.type = options.type || 'text';
    }
}
