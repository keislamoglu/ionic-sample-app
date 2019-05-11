import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AlertService, AuthService} from '../shared/services';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private _navController: NavController,
                private _authService: AuthService,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
        if (this._authService.isAuthenticated) {
            this.navToCaseFiles();
        }
    }

    signIn() {
        this._authService.login(this.email, this.password).subscribe({
            error: err => {
                this._alertService.message({
                    title: 'Başarısız Giriş',
                    message: 'Girilen bilgiler hatalı',
                });
            },
            next: user => this.navToCaseFiles()
        });
    }

    navToRegister() {
        this._navController.navigateRoot('/register');
    }

    navToCaseFiles() {
        this._navController.navigateRoot('/case-files');
    }
}
