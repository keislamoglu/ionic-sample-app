import {City} from './city';

export class Address {
    id: string;
    cityId: string;
    districtName: string;
    streetName: string;
    fullAddress: string;
    city: City;
}
