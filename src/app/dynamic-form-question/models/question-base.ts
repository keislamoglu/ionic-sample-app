import {QuestionCondition} from './questionCondition';

export type ControlType = 'dropdown' | 'textbox' | 'date' | 'checkbox' | 'textarea';

export interface QuestionBaseOptions<K> {
    value?: string;
    key?: K;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: ControlType;
    conditions?: QuestionCondition[];
}

export abstract class QuestionBase<K> {
    value: QuestionBaseOptions<K>['value'];
    key: QuestionBaseOptions<K>['key'];
    label: QuestionBaseOptions<K>['label'];
    required: QuestionBaseOptions<K>['required'];
    order: QuestionBaseOptions<K>['order'];
    conditions: QuestionBaseOptions<K>['conditions'];
    abstract controlType: ControlType;

    constructor(options: QuestionBaseOptions<K> = {}) {
        this.value = options.value;
        this.key = options.key;
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.conditions = options.conditions != null ? options.conditions : null;
    }
}
