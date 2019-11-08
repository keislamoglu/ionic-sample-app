import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

interface OptionItem {
    key: string | number;
    value: string;
}

export interface DropdownQuestionOptions extends QuestionBaseOptions<string> {
    options?: OptionItem[];
    multiple?: boolean;
}

export class DropdownQuestion extends QuestionBase<string> {
    controlType: ControlType = 'dropdown';
    options: OptionItem[] = [];
    multiple = false;

    constructor(options: DropdownQuestionOptions = {}) {
        super(options);
        this.options = options['options'] || [];
        this.multiple = options['multiple'] || false;
    }

}
