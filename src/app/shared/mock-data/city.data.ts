import {City} from '../entity';

export const CITIES: City[] = [
    ['İstanbul', '0d066c9f-3237-4f02-bc69-4ff0e4114ec3'],
    ['Ankara', '9b38e8c0-6429-4b72-be3e-aa64c1a9771c'],
    ['İzmir', '63005505-8d2f-4f7e-81f5-500f5c72707b'],
    ['Konya', '526a1e92-45c0-4f14-a5b6-391baf9586c7'],
    ['Adana', '585adf47-b6f3-48a4-b6a6-8ef3096aa089'],
    ['Erzincan', 'ff7006fb-b8eb-4977-a0c1-6d9323b16fae'],
    ['Kahramanmaraş', '26be97fb-8b9a-455b-8391-1818a2127a61'],
    ['Gaziantep', '354060ec-a469-4654-9f56-647c06fd5480'],
].map(([cityName, id]) => createCity(id, cityName));

function createCity(id: string, name: string) {
    return {id, name};
}
