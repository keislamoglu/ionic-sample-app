import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../shared/services';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private _navController: NavController,
                private _authService: AuthService) {
    }

    ngOnInit(): void {
        if (this._authService.isAuthenticated()) {
            this._navController.navigateRoot('/case-files');
        }
    }

    navToRegister() {
        this._navController.navigateRoot('/register');
    }
}
