import {NgModule} from '@angular/core';
import {InfoTagComponent} from './info-tag.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [InfoTagComponent],
    exports: [InfoTagComponent]
})
export class InfoTagModule {
}
