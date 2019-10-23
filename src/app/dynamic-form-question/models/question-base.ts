import {QuestionCondition} from './questionCondition';

export type ControlType = 'dropdown' | 'textbox' | 'date' | 'checkbox';

export interface QuestionBaseOptions<T = any> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: ControlType;
    conditions?: QuestionCondition[];
}

export abstract class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    conditions: QuestionCondition[];
    abstract controlType: ControlType;

    protected constructor(options: QuestionBaseOptions<T> = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.conditions = options.conditions != null ? options.conditions : null;
    }
}
