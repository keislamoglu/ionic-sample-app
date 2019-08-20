import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Question} from '../dynamic-form-question/models';
import {QuestionControlService} from '../shared/services/question-control.service';
import {AlertService} from '../shared/services';
import {ConditionChecker} from './condition-checker';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
    private _questions: Question[] = [];
    private _conditionChecker: ConditionChecker = new ConditionChecker(this._questionFinder.bind(this));

    @Input() form: FormGroup;

    @Input()
    set questions(value) {
        this._questions = value;
        this._updateFormGroup();
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
        this._updateFormGroup();
    }

    verifyCondition(question: Question) {
        return this._conditionChecker.verifyCondition(question);
    }

    private _updateFormGroup() {
        const formGroup = this.qcs.toFormGroup(this.questions);
        if (this.form.contains('dynamic')) {
            this.form.removeControl('dynamic');
        }
        this.form.addControl('dynamic', formGroup);
        this.formGroupUpdated.emit(formGroup);
        this.changeDetector.markForCheck();
    }

    private _questionFinder(key: string) {
        return this.questions.find(q => q.key === key);
    }
}
