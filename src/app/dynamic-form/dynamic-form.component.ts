import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Question} from '../dynamic-form-question/models';
import {QuestionControlService} from '../shared/services/question-control.service';
import {AlertService} from '../shared/services';
import {QuestionConditionValidator} from './question-condition-validator';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
    private _questions: Question[] = [];
    private _conditionValidator: QuestionConditionValidator;

    @Input() form: FormGroup;

    @Input()
    set questions(value) {
        this._questions = value;
        this._conditionValidator = new QuestionConditionValidator(this._questions);
        this._setQuestionFormGroup();
    }

    get questions() {
        return this._questions;
    }

    @Output() formGroupUpdated = new EventEmitter<FormGroup>();

    constructor(private qcs: QuestionControlService,
                private alertService: AlertService,
                private changeDetector: ChangeDetectorRef) {
    }


    ngOnInit() {
        this._setQuestionFormGroup();
    }

    checkVisibility(key: string) {
        return this._conditionValidator.validate(key);
    }

    private _setQuestionFormGroup() {
        const formGroup = this.qcs.toFormGroup(this.questions);
        this.form.setControl('dynamic', formGroup);
        this.formGroupUpdated.emit(formGroup);
        this.changeDetector.markForCheck();
        this.form.get('dynamic').valueChanges.subscribe(controls => {
            this._questions = this.questions.map(question => {
                const value = controls[question.key];
                if (question.value !== value) {
                    question.value = value;
                }
                return question;
            });
        });
    }
}
