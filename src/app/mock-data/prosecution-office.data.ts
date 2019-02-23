import {ProsecutionOffice} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';

export const PROSECUTION_OFFICES: ProsecutionOffice[] = [
    prosecutionOffice(lorem(10), 'İstanbul Çağlayan Adliyesi'),
    prosecutionOffice(lorem(15), 'İstanbul Kartal Adliyesi'),
    prosecutionOffice(lorem(8), 'İstanbul Beşiktaş Adliyesi'),
    prosecutionOffice(lorem(12), 'Foo Adliyesi'),
];

function prosecutionOffice(address, name): ProsecutionOffice {
    return {
        id: guid(),
        address,
        name
    };
}
