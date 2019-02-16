import {NgModule} from '@angular/core';
import {CaseFilesComponent} from './case-files.component';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../services';
import {IonicModule} from '@ionic/angular';
import {CaseFileModalComponent} from './case-file/case-file-modal.component';
import {FormsModule} from '@angular/forms';

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
