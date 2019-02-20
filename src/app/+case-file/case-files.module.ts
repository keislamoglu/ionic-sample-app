import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {CaseFilesComponent} from './case-files.component';
import {ServicesModule} from '../shared/services';
import {CaseFileModalComponent} from './case-file/case-file-modal.component';

@NgModule({
    declarations: [
        CaseFilesComponent,
        CaseFileModalComponent,
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
    ],
    exports: [CaseFilesComponent],
    entryComponents: [CaseFileModalComponent]
})
export class CaseFilesModule {
}
