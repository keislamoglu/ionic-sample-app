import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PartiesComponent} from './parties.component';
import {PartyDetailComponent} from './detail/party-detail.component';
import {AuthGuardService as AuthGuard} from '../shared/services';

const routes: Route[] = [
    {path: 'case-files/:caseFileId/parties', component: PartiesComponent, canActivate: [AuthGuard]},
    {path: 'parties/:id', component: PartyDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PartiesRoutingModule {
}
