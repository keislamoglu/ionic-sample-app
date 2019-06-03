export type ControlType = 'dropdown' | 'textbox' | 'checkbox' | 'radio' | 'date';

export interface QuestionBaseOptions<T = any> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: ControlType;
    condition?: boolean;
}

export abstract class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    condition: boolean;
    abstract controlType: ControlType;

    protected constructor(options: QuestionBaseOptions<T> = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.condition = options.condition != null ? options.condition : null;
    }
}
