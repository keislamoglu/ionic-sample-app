import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../shared/services';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    constructor(private _navController: NavController,
                private _authService: AuthService) {
    }

    ngOnInit(): void {
        if (this._authService.isAuthenticated()) {
            this._navController.navigateRoot('/case-files');
        }
    }

    navToLogin() {
        this._navController.navigateRoot('/login');
    }
}
