import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ExtensionTimesComponent} from './extension-times.component';
import {ExtensionTimeDetailComponent} from './detail/extension-time-detail.component';
import {AuthGuardService as AuthGuard} from '../shared/services';

const routes: Route[] = [
    {path: 'case-files/:caseFileId/extension-times', component: ExtensionTimesComponent, canActivate: [AuthGuard]},
    {path: 'extension-times/:id', component: ExtensionTimeDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ExtensionsTimeRoutingModule {
}
