import {CompetentAuthorityType, CompetentAuthority} from '../shared/entity';
import {guid, lorem} from '../shared/helpers';

export const COMPETENT_AUTHORITIES: CompetentAuthority[] = [
    competentAuthority(lorem(5), 'İstanbul Çağlayan Adliyesi', CompetentAuthorityType.CourtHouse),
    competentAuthority(lorem(4), 'İstanbul Kartal Adliyesi', CompetentAuthorityType.CourtHouse),
    competentAuthority(lorem(3), 'İstanbul Cumhuriyet Başsavcılığı', CompetentAuthorityType.ProsecutionOffice),
];

function competentAuthority(address: string, name: string, type: CompetentAuthorityType): CompetentAuthority {
    return {
        id: guid(),
        address,
        name,
        type
    };
}
