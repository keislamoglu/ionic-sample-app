import {NgModule} from '@angular/core';
import {CaseFileComponent} from './case-file.component';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../services';
import {IonicModule} from '@ionic/angular';
import {CaseFileCreateModalComponent} from './create/case-file-create-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CaseFileComponent,
        CaseFileCreateModalComponent,
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
    ],
    exports: [CaseFileComponent],
    entryComponents: [CaseFileCreateModalComponent]
})
export class CaseFileModule {
}
