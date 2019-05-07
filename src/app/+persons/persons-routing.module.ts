import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PersonsComponent} from './persons.component';
import {PersonDetailComponent} from './detail/person-detail.component';
import {AuthGuardService as AuthGuard} from '../shared/services';

const routes: Route[] = [
    {
        path: 'persons', canActivate: [AuthGuard], children: [
            {path: '', component: PersonsComponent},
            {path: ':id', component: PersonDetailComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PersonsRoutingModule {
}
