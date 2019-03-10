import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CaseFilesComponent} from './case-files.component';
import {CaseFileDetailComponent} from './detail/case-file-detail.component';

const routes: Route[] = [
    {path: 'case-files', component: CaseFilesComponent},
    {path: 'case-files/:id', component: CaseFileDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CaseFilesRoutingModule {
}
