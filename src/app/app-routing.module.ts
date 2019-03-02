import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PetitionsComponent} from './+petitions/petitions.component';
import {CaseFilesComponent} from './+case-files/case-files.component';
import {CaseFileDetailComponent} from './+case-files/detail/case-file-detail.component';
import {PersonsComponent} from './+persons/persons.component';
import {PersonDetailComponent} from './+persons/detail/person-detail.component';
import {PetitionDetailComponent} from './+petitions/detail/petition-detail.component';

const routes: Routes = [
    {path: '', redirectTo: 'case-files', pathMatch: 'full'},
    {path: 'case-files', component: CaseFilesComponent},
    {path: 'case-files/:id', component: CaseFileDetailComponent},
    {path: 'persons', component: PersonsComponent},
    {path: 'persons/:id', component: PersonDetailComponent, pathMatch: 'full'},
    {path: 'case-files/:caseFileId/persons/:id', component: PersonDetailComponent},
    {path: 'persons/:id/petitions', component: PetitionsComponent, pathMatch: 'full'},
    {path: 'case-files/:caseFileId/persons/:id/petitions', component: PetitionsComponent},
    {path: 'petitions/:id', component: PetitionDetailComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
