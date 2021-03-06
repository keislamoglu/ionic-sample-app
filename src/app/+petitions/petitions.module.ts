import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PetitionsComponent} from './petitions.component';
import {PetitionEditModalComponent} from './edit/petition-edit-modal.component';
import {ServicesModule} from '../shared/services';
import {PetitionDetailComponent} from './detail/petition-detail.component';
import {PetitionsRoutingModule} from './petitions-routing.module';
import {RepositoriesModule} from '../shared/repositories';
import {DynamicFormModule} from '../dynamic-form';
import {CardModule} from '../card';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ServicesModule,
        RepositoriesModule,
        FormsModule,
        PetitionsRoutingModule,
        DynamicFormModule,
        ReactiveFormsModule,
        CardModule,
    ],
    declarations: [
        PetitionsComponent,
        PetitionEditModalComponent,
        PetitionDetailComponent,
    ],
    exports: [
        PetitionsComponent,
        PetitionsRoutingModule,
    ],
    entryComponents: [
        PetitionEditModalComponent,
    ],
})
export class PetitionsModule {
}
