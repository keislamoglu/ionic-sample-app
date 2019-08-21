import {PetitionTemplate, TemplateDocument} from '../entity';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: 'cebf733d-14ae-4244-bd97-abf224023bd9',
        name: 'Görüşmeye Davet',
        slugName: TemplateDocument.UzlasmaGorusmesineDavet
    },
    {
        id: '18572edd-3f4d-463c-826d-8c7806c97fc7',
        name: 'SEGBİS Görüşme Talebi',
        slugName: TemplateDocument.SegbisGorusmeTalep
    },
    {
        id: '5931a8fe-73c6-489b-81d3-be660fe64277',
        name: 'Kov. Dos. Uzlaştırma Görüşme Tutanağı',
        slugName: TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi
    },
    {
        id: '4425eb02-9ef4-41a7-b71a-2f7948cce69e',
        name: 'Kov. Uzlaşma Teklif Formu',
        slugName: TemplateDocument.KovusturmaUzlasmaTeklif
    },
    {
        id: '75735d45-174b-4033-b667-cafd7f0d315e',
        name: 'Kov. Dos. Olumlu Uzlaştırma Raporu',
        slugName: TemplateDocument.KovusturmaOlumluUzlastirmaRaporu
    },
    {
        id: '212f74d0-c51f-4b9d-8b74-518f1e1019bb',
        name: 'Kov. Dos. Olumsuz Uzlaştırma Raporu',
        slugName: TemplateDocument.KovusturmaOlumsuzUzlastirmaRaporu
    },
    {
        id: '675004c2-ca18-40e9-8299-1ca41434cf2c',
        name: 'Sor. Dos. Olumlu Uzlaştırma Raporu',
        slugName: TemplateDocument.SorusturmaOlumluUzlastirmaRaporu
    },
    {
        id: '50c0e665-0e95-45b4-8dd5-baf4654183d5',
        name: 'Sor. Dos. Olumsuz Uzlaştırma Raporu',
        slugName: TemplateDocument.SorusturmaOlumsuzUzlastirmaRaporu
    },
    {
        id: '9b961498-1ec5-4a4e-bf79-ce9582c44edc',
        name: 'Sor. Dos. Uzlaştırma Görüşme Tutanağı',
        slugName: TemplateDocument.SorusturmaUzlastirmaciGorusmeTutanagi
    },
    {
        id: 'e6f0b692-11ee-4411-84a9-94cf2de274cd',
        name: 'Talimat Yazısı Talep Dilekçesi',
        slugName: TemplateDocument.TalimatYazisiTalep
    },
    {
        id: '908c92c9-8c99-430c-a3f7-d8a5c5f9944c',
        name: 'Tesim ve Masraf Belgesi',
        slugName: TemplateDocument.TesimVeMasrafBelgesi
    },
    {
        id: '22c2b00f-cf18-409f-8c4b-5d175676ed10',
        name: 'Görüşmelerin Yapılamadığına Dair Tutanak',
        slugName: TemplateDocument.GorusmelerinYapilamadiginaDairTutanak
    }
];
