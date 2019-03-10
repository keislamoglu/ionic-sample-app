import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PetitionsComponent} from './petitions.component';
import {PetitionDetailComponent} from './detail/petition-detail.component';

const routes: Route[] = [
    {path: 'parties/:partyId/petitions', component: PetitionsComponent},
    {path: 'petitions/:id', component: PetitionDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PetitionsRoutingModule {
}
