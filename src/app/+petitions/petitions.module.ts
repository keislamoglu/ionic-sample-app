import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PetitionsComponent} from './petitions.component';
import {PetitionModalComponent} from './petition/petition-modal.component';
import {ServicesModule} from '../services';
import {InfoTagModule} from '../info-tag';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        FormsModule,
        InfoTagModule,
    ],
    declarations: [
        PetitionsComponent,
        PetitionModalComponent,
    ],
    exports: [
        PetitionsComponent
    ],
    entryComponents: [
        PetitionModalComponent
    ]
})
export class PetitionsModule {
}
