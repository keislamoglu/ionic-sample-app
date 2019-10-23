import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

interface OptionItem {
    key: string;
    value: string;
}

export interface CheckboxQuestionOptions extends QuestionBaseOptions<string> {
    options?: OptionItem[];
}

export class CheckboxQuestion extends QuestionBase<string> {
    controlType: ControlType = 'checkbox';
    options: OptionItem[] = [];

    constructor(options: CheckboxQuestionOptions = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
