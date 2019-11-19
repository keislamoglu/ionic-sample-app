import {Address} from '../entity';
import {AppConfig} from '../app-config';

export function printAddress(address: Address) {
    return [
        address.fullAddress,
        address.streetName,
        address.districtName,
        address.cityName,
        address.country.name
    ].join(', ');
}

export function isDomestic(address: Address) {
    return address.country.code.toLowerCase() === AppConfig.CountryCode.toLowerCase();
}
