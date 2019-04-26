import {CompetentAuthorityType, CompetentAuthority} from '../shared/entity';
import {lorem} from '../shared/helpers';

export const COMPETENT_AUTHORITIES: CompetentAuthority[] = [
    competentAuthority('d37d50b4-dda4-41dd-dba0-221803431625',
        lorem(5), 'İstanbul Çağlayan Adliyesi',
        CompetentAuthorityType.CourtHouse),
    competentAuthority('8b9ddb45-aee7-4734-8bc9-2e8d5bbdb439',
        lorem(4),
        'İstanbul Kartal Adliyesi', CompetentAuthorityType.CourtHouse),
    competentAuthority('cd10d954-ebda-420d-738e-7cac09324d25',
        lorem(3),
        'İstanbul Cumhuriyet Başsavcılığı', CompetentAuthorityType.AttorneyGeneralship),
];

function competentAuthority(id: string, address: string, name: string, type: CompetentAuthorityType): CompetentAuthority {
    return {
        id,
        address,
        name,
        type
    };
}
