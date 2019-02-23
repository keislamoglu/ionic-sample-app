import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PetitionsComponent} from './petitions.component';
import {PetitionModalComponent} from './petition/petition-modal.component';
import {ServicesModule} from '../shared/services';
import {RuntimeContentModule} from '../shared/runtime-content';
import {PetitionPreviewComponent} from './preview/petition-preview.component';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

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
        PetitionModalComponent,
        PetitionPreviewComponent,
    ],
    exports: [
        PetitionsComponent
    ],
    entryComponents: [
        PetitionModalComponent,
        PetitionPreviewComponent,
    ],
    providers: [
        File,
        FileOpener,
    ]
})
export class PetitionsModule {
}
