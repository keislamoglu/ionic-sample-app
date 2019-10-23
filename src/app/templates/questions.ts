import {TemplateDocument} from '../shared/constants';
import {SegbisGorusmeTalepQuestions} from './segbis-gorusme-talep';
import {KovusturmaUzlastirmaciGorusmeTutanagiQuestions} from './kovusturma-uzlastirmaci-gorusme-tutanagi';
import {KovusturmaOlumluUzlastirmaRaporuQuestions} from './kovusturma-olumlu-uzlastirma-raporu';
import {KovusturmaOlumsuzUzlastirmaRaporuQuestions} from './kovusturma-olumsuz-uzlastirma-raporu';
import {SorusturmaOlumluUzlastirmaRaporuQuestions} from './sorusturma-olumlu-uzlastirma-raporu';
import {SorusturmaOlumsuzUzlastirmaRaporuQuestions} from './sorusturma-olumsuz-uzlastirma-raporu';
import {SorusturmaUzlastirmaciGorusmeTutanagiQuestions} from './sorusturma-uzlastirmaci-gorusme-tutanagi';
import {TalimatYazisiTalepQuestions} from './talimat-yazisi-talep';
import {TesimVeMasrafBelgesiQuestions} from './tesim-ve-masraf-belgesi';
import {GorusmelerinYapilamadiginaDairTutanakQuestions} from './gorusmelerin-yapilamadigina-dair-tutanak';
import {GorusmeyeDavetQuestions} from './gorusmeye-davet';
import {UzlasmaTeklifFormuQuestions} from './uzlasma-teklif-formu';

export const TemplateQuestions = {
    [TemplateDocument.UzlasmaGorusmesineDavet]: GorusmeyeDavetQuestions,
    [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalepQuestions,
    [TemplateDocument.UzlasmaGorusmesineDavet]: [],
    [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.KovusturmaOlumluUzlastirmaRaporu]: KovusturmaOlumluUzlastirmaRaporuQuestions,
    [TemplateDocument.KovusturmaOlumsuzUzlastirmaRaporu]: KovusturmaOlumsuzUzlastirmaRaporuQuestions,
    [TemplateDocument.SorusturmaOlumluUzlastirmaRaporu]: SorusturmaOlumluUzlastirmaRaporuQuestions,
    [TemplateDocument.SorusturmaOlumsuzUzlastirmaRaporu]: SorusturmaOlumsuzUzlastirmaRaporuQuestions,
    [TemplateDocument.SorusturmaUzlastirmaciGorusmeTutanagi]: SorusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.TalimatYazisiTalep]: TalimatYazisiTalepQuestions,
    [TemplateDocument.TesimVeMasrafBelgesi]: TesimVeMasrafBelgesiQuestions,
    [TemplateDocument.GorusmelerinYapilamadiginaDairTutanak]: GorusmelerinYapilamadiginaDairTutanakQuestions,
    [TemplateDocument.UzlasmaTeklifFormu]: UzlasmaTeklifFormuQuestions
};
