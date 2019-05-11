import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientUser, BackendUser} from '../entity';
import {map} from 'rxjs/operators';
import {AppConfig} from '../app-config';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _authenticated = false;

    constructor(private _http: HttpClient) {
    }

    login(email: string, password: string) {
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
                this._authenticated = true;
                // TODO: save localStorage

                return user;
            })
        );
    }

    logout() {
        this._authenticated = false;
        // TODO: remove from localStorage
    }

    isAuthenticated() {
        return this._authenticated;
    }

    private _hashPassword(password: string) {
        return password;
    }
}
