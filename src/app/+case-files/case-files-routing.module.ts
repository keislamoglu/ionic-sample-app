import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CaseFilesComponent} from './case-files.component';
import {CaseFileDetailComponent} from './detail/case-file-detail.component';
import {AuthGuardService} from '../shared/services';

const routes: Route[] = [
    {
        path: 'case-files', canActivate: [AuthGuardService], children: [
            {path: '', component: CaseFilesComponent},
            {path: ':id', component: CaseFileDetailComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CaseFilesRoutingModule {
}
