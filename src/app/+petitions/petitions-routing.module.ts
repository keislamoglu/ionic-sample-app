import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PetitionsComponent} from './petitions.component';
import {PetitionDetailComponent} from './detail/petition-detail.component';
import {AuthGuardService as AuthGuard} from '../shared/services';

const routes: Route[] = [
    {path: 'parties/:partyId/petitions', component: PetitionsComponent, canActivate: [AuthGuard]},
    {path: 'petitions/:id', component: PetitionDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PetitionsRoutingModule {
}
