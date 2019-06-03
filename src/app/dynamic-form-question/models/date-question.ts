import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

export interface DateQuestionOptions extends QuestionBaseOptions<string> {
    format?: string;
}

export class DateQuestion extends QuestionBase<string> {
    controlType: ControlType = 'date';
    format: string;

    constructor(options: DateQuestionOptions = {}) {
        super(options);
        this.format = options.format || 'DD/MM/YYYY';
    }
}
