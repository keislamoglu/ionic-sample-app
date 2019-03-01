import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PetitionsComponent} from './petitions.component';
import {PetitionEditModalComponent} from './edit/petition-edit-modal.component';
import {ServicesModule} from '../shared/services';
import {RuntimeContentModule} from '../shared/runtime-content';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {PetitionDetailComponent} from './detail/petition-detail.component';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
        RuntimeContentModule,
    ],
    declarations: [
        PetitionsComponent,
        PetitionEditModalComponent,
        PetitionDetailComponent,
    ],
    exports: [
        PetitionsComponent,
    ],
    entryComponents: [
        PetitionEditModalComponent,
    ],
    providers: [
        File,
        FileOpener,
    ]
})
export class PetitionsModule {
}
