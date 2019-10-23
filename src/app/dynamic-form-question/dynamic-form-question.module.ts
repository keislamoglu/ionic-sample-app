import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [DynamicFormQuestionComponent],
    exports: [DynamicFormQuestionComponent]
})
export class DynamicFormQuestionModule {
}
