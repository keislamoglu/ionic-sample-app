export class ClientUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    identificationNo: string;
    registrationNo: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionDate: string;
}

export class BackendUser {
    userId: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    sicilNumber: string;
    phone: string;
    address: string;
    commissioningDate: string;
    subscriptionStatus?: SubscriptionStatus;
    subscriptionDate?: string;
    identificationNo: string; // TODO: should be implemented on backend
}

export enum SubscriptionStatus {
    Active = 1,
    Trial = 2,
    Expired = 3
}
