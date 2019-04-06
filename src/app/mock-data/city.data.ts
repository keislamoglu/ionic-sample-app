import {City} from '../shared/entity';
import {guid} from '../shared/helpers';

export const CITIES: City[] = [
    'İstanbul', 'Ankara', 'İzmir', 'Konya', 'Adana', 'Erzincan', 'Kahramanmaraş', 'Gaziantep',
].map(cityName => createCity(cityName));

function createCity(name: string) {
    return {id: guid(), name};
}
