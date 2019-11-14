import {Country} from './country';

export class Address {
    id: string;
    countryId: string;
    districtName: string;
    streetName: string;
    fullAddress: string;
    cityName: string;
    country: Country;
}
