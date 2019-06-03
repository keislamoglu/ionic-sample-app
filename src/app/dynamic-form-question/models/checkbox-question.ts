import {ControlType, QuestionBase} from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {
    controlType: ControlType = 'checkbox';
}
