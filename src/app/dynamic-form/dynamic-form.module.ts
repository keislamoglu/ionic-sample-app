import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFormQuestionModule} from '../dynamic-form-question';
import {ServicesModule} from '../shared/services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormQuestionModule,
        ServicesModule
    ],
    declarations: [DynamicFormComponent],
    exports: [DynamicFormComponent]
})
export class DynamicFormModule {
}
