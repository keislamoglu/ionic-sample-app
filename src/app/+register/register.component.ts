import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AlertService, AuthService} from '../shared/services';
import {BackendUser} from '../shared/entity';
import {UserService} from '../shared/repositories';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    user: BackendUser = new BackendUser();

    constructor(private _navController: NavController,
                private _userService: UserService,
                private _authService: AuthService,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
        if (this._authService.isAuthenticated()) {
            this._navController.navigateRoot('/case-files');
        }
    }

    navToLogin() {
        this._navController.navigateRoot('/login');
    }

    register() {
        this._userService.add(this.user).subscribe({
            next: () => {
                this.navToLogin();
            },
            error: () => {
                this._alertService.message({title: 'Başarısız', message: 'Bir hata meydana geldi'});
            }
        });
    }
}
