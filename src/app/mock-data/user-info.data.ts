import {UserInfo} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';

export const USER_INFOS: UserInfo[] = [
    createUser('Fatih', 'Aytuç')
];


function createUser(name: string, lastname: string): UserInfo {
    let middlename;
    [name, middlename] = name.split(' ', 1);
    return {
        id: guid(),
        name,
        middlename,
        lastname,
        address: lorem(Math.floor(Math.random() * 25) + 25),
        nId: '12345678901',
        phone: '05001234567'
    };
}
