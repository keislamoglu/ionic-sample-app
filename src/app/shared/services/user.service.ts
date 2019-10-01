import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {BackendUser, ClientUser, SubscriptionStatus} from '../entity';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../app-config';
import {map} from 'rxjs/operators';

interface RegisterResp {
    userId: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionDate: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
    currentUser: ClientUser | null = null;

    constructor(private _http: HttpClient, private _storage: Storage) {
    }

    static toBackendUser(clientUser: ClientUser): BackendUser {
        return {
            userId: clientUser.id,
            name: clientUser.name,
            surname: clientUser.lastName,
            password: void 0,
            address: clientUser.address,
            commissioningDate: '',
            email: clientUser.email,
            phone: clientUser.phone,
            sicilNumber: clientUser.registrationNo,
            subscriptionDate: clientUser.subscriptionDate,
            subscriptionStatus: clientUser.subscriptionStatus
        };
    }

    static toClientUser(backendUser: BackendUser): ClientUser {
        return {
            id: backendUser.userId,
            name: backendUser.name,
            lastName: backendUser.surname,
            email: backendUser.email,
            phone: backendUser.phone,
            registrationNo: backendUser.sicilNumber,
            address: backendUser.address,
            subscriptionStatus: backendUser.subscriptionStatus,
            subscriptionDate: backendUser.subscriptionDate,
            identificationNo: ''
        };
    }

    create(data: BackendUser): Observable<ClientUser> {
        const headers = new HttpHeaders({'Auth-Token': AppConfig.authToken});
        return this._http.post(AppConfig.registerUrl, data, {headers}).pipe(
            map((resp: RegisterResp) => {
                const user = UserService.toClientUser(data);
                user.id = resp.userId;
                user.subscriptionStatus = resp.subscriptionStatus;
                user.subscriptionDate = resp.subscriptionDate;
                return user;
            })
        );
    }
}
