import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CaseFilesComponent} from './+case-file/case-files.component';
import {PersonsComponent} from './+persons/persons.component';

const routes: Routes = [
    {path: '', component: CaseFilesComponent},
    {path: 'persons', component: PersonsComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
