import {ControlType, QuestionBase} from './question-base';

export class TextareaQuestion extends QuestionBase<string> {
    controlType: ControlType = 'textarea';
}
