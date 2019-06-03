import {ControlType, QuestionBase, QuestionBaseOptions} from './question-base';

interface OptionItem {
    key: string;
    value: string;
    selected?: boolean;
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

    isSelected(keys: string | string[]): boolean {
        if (typeof keys === 'string') {
            keys = [keys];
        }
        return keys.every(key => this.options.some(opt => opt.key === key && opt.selected));
    }
}
