import {NgModule} from '@angular/core';
import {PersonsComponent} from './persons.component';
import {PersonEditModalComponent} from './edit/person-edit-modal.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ServicesModule} from '../shared/services';
import {FormsModule} from '@angular/forms';
import {PersonDetailComponent} from './detail/person-detail.component';
import {PersonsRoutingModule} from './persons-routing.module';
import {RepositoriesModule} from '../shared/repositories';

@NgModule({
    declarations: [
        PersonsComponent,
        PersonDetailComponent,
        PersonEditModalComponent,
    ],
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        ServicesModule,
        RepositoriesModule,
        FormsModule,
        PersonsRoutingModule,
    ],
    exports: [
        PersonsComponent,
        PersonsRoutingModule
    ],
    entryComponents: [PersonEditModalComponent]
})
export class PersonsModule {
}
