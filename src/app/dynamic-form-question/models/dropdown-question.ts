import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

interface OptionItem {
    key: string;
    value: string;
}

export interface DropdownQuestionOptions extends QuestionBaseOptions<string> {
    options?: OptionItem[];
}

export class DropdownQuestion extends QuestionBase<string> {
    controlType: ControlType = 'dropdown';
    options: OptionItem[] = [];

    constructor(options: DropdownQuestionOptions = {}) {
        super(options);
        this.options = options['options'] || [];
    }

}
