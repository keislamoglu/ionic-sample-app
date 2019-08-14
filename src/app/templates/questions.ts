import {TemplateDocument} from '../shared/entity';
import {SegbisGorusmeTalepQuestions} from './segbis-gorusme-talep';
import {KovusturmaUzlastirmaciGorusmeTutanagiQuestions} from './kovusturma-uzlastirmaci-gorusme-tutanagi';
import {KovusturmaUzlasmaTelifQuestions} from './kovusturma-uzlasma-teklif';
import {KovusturmaOlumluUzlastirmaRaporuQuestions} from './kovusturma-olumlu-uzlastirma-raporu';
import {KovusturmaOlumsuzUzlastirmaRaporuQuestions} from './kovusturma-olumsuz-uzlastirma-raporu';
import {SorusturmaOlumluUzlastirmaRaporuQuestions} from './sorusturma-olumlu-uzlastirma-raporu';

export const TemplateQuestions = {
    [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalepQuestions,
    [TemplateDocument.Istinabe]: [],
    [TemplateDocument.UzlasmaGorusmesineDavet]: [],
    [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.KovusturmaUzlasmaTeklif]: KovusturmaUzlasmaTelifQuestions,
    [TemplateDocument.KovusturmaOlumluUzlastirmaRaporu]: KovusturmaOlumluUzlastirmaRaporuQuestions,
    [TemplateDocument.KovusturmaOlumsuzUzlastirmaRaporu]: KovusturmaOlumsuzUzlastirmaRaporuQuestions,
    [TemplateDocument.SorusturmaOlumluUzlastirmaRaporu]: SorusturmaOlumluUzlastirmaRaporuQuestions,
};
