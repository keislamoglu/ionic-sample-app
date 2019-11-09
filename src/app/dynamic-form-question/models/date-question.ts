import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

export interface DateQuestionOptions<K> extends QuestionBaseOptions<K> {
    format?: string;
}

export class DateQuestion<K = string> extends QuestionBase<K> {
    controlType: ControlType = 'date';
    format: string;

    constructor(options: DateQuestionOptions<K> = {}) {
        super(options);
        this.format = options.format || 'DD/MM/YYYY';
    }
}
