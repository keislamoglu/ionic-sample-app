import {NgModule} from '@angular/core';
import {ExtensionTimesComponent} from './extension-times.component';
import {ExtensionsTimeRoutingModule} from './extensions-time-routing.module';
import {ExtensionTimeDetailComponent} from './detail/extension-time-detail.component';
import {ExtensionTimeEditModalComponent} from './edit/extension-time-edit-modal.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../shared/services';
import {FormsModule} from '@angular/forms';
import {RepositoriesModule} from '../shared/repositories';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ServicesModule,
        RepositoriesModule,
        FormsModule,
        ExtensionsTimeRoutingModule
    ],
    declarations: [
        ExtensionTimesComponent,
        ExtensionTimeDetailComponent,
        ExtensionTimeEditModalComponent
    ],
    exports: [
        ExtensionTimesComponent,
        ExtensionsTimeRoutingModule
    ],
    entryComponents: [
        ExtensionTimeEditModalComponent
    ]
})
export class ExtensionTimesModule {
}
