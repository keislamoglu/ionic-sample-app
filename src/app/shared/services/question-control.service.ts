import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ServicesModule} from './services.module';
import {Question} from '../../dynamic-form-question/models';

@Injectable({providedIn: ServicesModule})
export class QuestionControlService {

    constructor() {
    }

    toFormGroup(questions: Question[]) {
        const group: any = {};

        questions.forEach(question => {
            group[question.key] = new FormControl(
                question.value || '',
                question.required ? Validators.required : void 0
            );
        });

        return new FormGroup(group);
    }

}
