import {Address} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';
import {CITIES} from './city.data';

let i = 0;

export const ADDRESSES: Address[] = [
    createAddress(CITIES[i++].id, `İlçe - ${i}`, `Sokak - ${i}`, lorem(3)),
    createAddress(CITIES[i++].id, `İlçe - ${i}`, `Sokak - ${i}`, lorem(3)),
    createAddress(CITIES[i++].id, `İlçe - ${i}`, `Sokak - ${i}`, lorem(3)),
];

function createAddress(cityId: string, district: string, street: string, fullAddress: string) {
    const addr = new Address();
    addr.id = guid();
    addr.cityId = cityId;
    addr.district = district;
    addr.street = street;
    addr.fullAddress = fullAddress;
    return addr;
}
