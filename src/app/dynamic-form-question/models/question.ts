import {DropdownQuestion} from './dropdown-question';
import {TextboxQuestion} from './textbox-question';
import {DateQuestion} from './date-question';

export type Question = DropdownQuestion | TextboxQuestion | DateQuestion;
