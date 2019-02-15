import {UserInfo} from '../entity/user-info';
import {guid, lorem} from '../helpers';

export const USER_INFOS: UserInfo[] = [
    createUser('Fatih', 'Aytuç')
];


function createUser(name: string, lastname: string) {
    let middlename;
    [name, middlename] = name.split(' ', 1);
    const user = new UserInfo();
    if (middlename) {
        user.middlename = middlename;
    }
    user.id = guid();
    user.lastname = lastname;
    user.address = lorem(Math.floor(Math.random() * 25) + 25);
    user.nId = '12345678901';
    user.phone = '05001234567';
    return user;
}
