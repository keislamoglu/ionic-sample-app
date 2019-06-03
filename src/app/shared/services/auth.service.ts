import {EventEmitter, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BackendUser, ClientUser} from '../entity';
import {map} from 'rxjs/operators';
import {AppConfig} from '../app-config';
import {fromPromise} from 'rxjs/internal-compatibility';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _hasServerGrant = false;
    private _authenticated = false;
    loginStatusChanged = new EventEmitter();

    constructor(private _http: HttpClient, private _storage: Storage, private _userService: UserService) {
        fromPromise(this._storage.get('user')).subscribe(user => {
            this._userService.currentUser = user;
            this._authenticated = !!user;
            this._propagateLoginStatus();
        });
    }

    get isAuthenticated(): boolean {
        return this._authenticated;
    }

    login(email: string, password: string): Observable<ClientUser> {
        const headers = new HttpHeaders({'Auth-Token': AppConfig.authToken});
        return this._http.post(AppConfig.loginUrl, {email, password}, {headers}).pipe(
            map((resp: BackendUser) => {
                const [name, middlename] = resp.name.split(' ');

                const user: ClientUser = {
                    id: resp.userId,
                    name,
                    middlename,
                    lastname: resp.surname,
                    email: resp.email,
                    phone: resp.phone,
                    sicilNumber: resp.sicilNumber,
                    address: resp.address,
                    commissioningDate: resp.commissioningDate,
                    subscriptionStatus: resp.subscriptionStatus,
                    subscriptionDate: resp.subscriptionDate
                };
                this._authenticated = this._hasServerGrant = true;
                this._userService.currentUser = user;
                this._propagateLoginStatus();

                return user;
            })
        );
    }

    logout(): void {
        this._authenticated = this._hasServerGrant = false;
        this._storage.remove('user');
        this._propagateLoginStatus();
    }

    hasServerGrant(): boolean {
        return this._hasServerGrant;
    }

    private _propagateLoginStatus() {
        this.loginStatusChanged.emit(this._authenticated);
    }
}
