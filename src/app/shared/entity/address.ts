import {City} from './city';

export class Address {
    id: string;
    cityId: string;
    district: string;
    street: string;
    fullAddress: string;
    city: City;
}
