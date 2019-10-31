import {Address} from '../entity';

export function printAddress(address: Address) {
    return `${address.fullAddress}, ${address.districtName}, ${address.city.name}`;
}
