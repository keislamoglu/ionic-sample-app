import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {RegisterComponent} from './register.component';

const routes: Route[] = [
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegisterRoutingModule {
}
