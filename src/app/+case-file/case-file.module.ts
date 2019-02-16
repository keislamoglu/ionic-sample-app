import {NgModule} from '@angular/core';
import {CaseFileComponent} from './case-file.component';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../services';
import {IonicModule} from '@ionic/angular';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CaseFileComponent,
        CaseFileEditModalComponent,
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
    ],
    exports: [CaseFileComponent],
    entryComponents: [CaseFileEditModalComponent]
})
export class CaseFileModule {
}
