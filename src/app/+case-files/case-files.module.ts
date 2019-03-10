import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {CaseFilesComponent} from './case-files.component';
import {ServicesModule} from '../shared/services';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {CaseFileDetailComponent} from './detail/case-file-detail.component';
import {CaseFilesRoutingModule} from './case-files-routing.module';

@NgModule({
    declarations: [
        CaseFilesComponent,
        CaseFileEditModalComponent,
        CaseFileDetailComponent,
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
        CaseFilesRoutingModule,
    ],
    exports: [
        CaseFilesComponent,
        CaseFilesRoutingModule,
    ],
    entryComponents: [
        CaseFileEditModalComponent,
        CaseFileDetailComponent,
    ],
})
export class CaseFilesModule {
}
