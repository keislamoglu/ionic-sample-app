import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [
        IonicModule.forRoot(),
        DashboardRoutingModule,
    ],
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardRoutingModule,
        DashboardComponent
    ]
})
export class DashboardModule {
}
