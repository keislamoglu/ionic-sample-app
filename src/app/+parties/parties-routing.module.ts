import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PartiesComponent} from './parties.component';
import {PartyDetailComponent} from './detail/party-detail.component';

const routes: Route[] = [
    {path: 'case-files/:caseFileId/parties', component: PartiesComponent},
    {path: 'parties/:id', component: PartyDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PartiesRoutingModule {
}
