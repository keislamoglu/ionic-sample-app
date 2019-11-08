import {DropdownQuestion} from './dropdown-question';
import {TextboxQuestion} from './textbox-question';
import {DateQuestion} from './date-question';
import {TextareaQuestion} from './textarea-question';

export type Question = DropdownQuestion | TextboxQuestion | DateQuestion | TextareaQuestion;
