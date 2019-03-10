import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PersonsComponent} from './persons.component';
import {PersonDetailComponent} from './detail/person-detail.component';

const routes: Route[] = [
    {path: 'persons', component: PersonsComponent},
    {path: 'persons/:id', component: PersonDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PersonsRoutingModule {
}
