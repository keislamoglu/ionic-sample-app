import {ProsecutionOffice} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';

export const PROSECUTION_OFFICES: ProsecutionOffice[] = [
    prosecutionOffice(lorem(10), 'Foo'),
    prosecutionOffice(lorem(15), 'Bar'),
    prosecutionOffice(lorem(8), 'Baz'),
    prosecutionOffice(lorem(12), 'Qux'),
];

function prosecutionOffice(address, name): ProsecutionOffice {
    return {
        id: guid(),
        address,
        name
    };
}
