import {ControlType, QuestionBase} from './question-base';

export class TextareaQuestion<K = string> extends QuestionBase<K> {
    controlType: ControlType = 'textarea';
}
