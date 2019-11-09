import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

interface OptionItem {
    key: string | number;
    value: string;
}

export interface DropdownQuestionOptions<K> extends QuestionBaseOptions<K> {
    options?: OptionItem[];
    multiple?: boolean;
}

export class DropdownQuestion<K = string> extends QuestionBase<K> {
    controlType: ControlType = 'dropdown';
    options: OptionItem[] = [];
    multiple = false;

    constructor(options: DropdownQuestionOptions<K> = {}) {
        super(options);
        this.options = options['options'] || [];
        this.multiple = options['multiple'] || false;
    }

}
