import {PetitionTemplate, TemplateDocument} from '../entity';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {
        id: 'cebf733d-14ae-4244-bd97-abf224023bd9',
        name: 'Görüşmeye Davet',
        slugName: TemplateDocument.UzlasmaGorusmesineDavet
    },
    {
        id: '68c0e11e-8292-4c95-bde5-de7d732aaea8',
        name: 'İstinabe',
        slugName: TemplateDocument.Istinabe
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
];
