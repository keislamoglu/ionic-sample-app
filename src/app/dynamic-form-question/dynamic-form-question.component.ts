import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Question} from './models';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormQuestionComponent {
    @Input() question: Question;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.question.key].valid;
    }
}
