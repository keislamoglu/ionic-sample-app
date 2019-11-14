import {Address} from '../entity';

export function printAddress(address: Address) {
    return [
        address.fullAddress,
        address.streetName,
        address.districtName,
        address.cityName,
        address.country.name
    ].join(', ');
}
