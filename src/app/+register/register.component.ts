import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AlertService, AuthService, UserService} from '../shared/services';
import {BackendUser} from '../shared/entity';

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
        if (this._authService.isAuthenticated) {
            this.navToCaseFiles();
        }

        this._authService.loginStatusChanged.subscribe(auth => {
            if (auth) {
                this.navToCaseFiles();
            }
        });
    }

    navToLogin() {
        this._navController.navigateRoot('/login');
    }

    navToCaseFiles() {
        this._navController.navigateRoot('/case-files');
    }

    register() {
        this._userService.create(this.user).subscribe({
            next: () => {
                this.navToLogin();
            },
            error: () => {
                this._alertService.message({title: 'Başarısız', message: 'Bir hata meydana geldi'});
            }
        });
    }
}
