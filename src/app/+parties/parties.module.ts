import {NgModule} from '@angular/core';
import {PartiesComponent} from './parties.component';
import {PartyDetailComponent} from './detail/party-detail.component';
import {PartiesRoutingModule} from './parties-routing.module';
import {PartyEditModalComponent} from './edit/party-edit-modal.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../shared/services';
import {FormsModule} from '@angular/forms';
import {CardModule} from '../card';
import {RepositoriesModule} from '../shared/repositories';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        RepositoriesModule,
        FormsModule,
        CardModule,
        PartiesRoutingModule,
    ],
    declarations: [
        PartiesComponent,
        PartyDetailComponent,
        PartyEditModalComponent
    ],
    exports: [
        PartiesComponent,
        PartyDetailComponent,
        PartiesRoutingModule
    ],
    entryComponents: [
        PartyEditModalComponent
    ]
})
export class PartiesModule {
}
