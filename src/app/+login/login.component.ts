import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    constructor(private _navController: NavController) {
    }

    navToRegister() {
        this._navController.navigateForward('/register');
    }
}
