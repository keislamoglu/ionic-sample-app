import {TemplateDocument} from '../shared/constants';
import {
    GorusmelerinYapilamadiginaDairTutanakQuestions,
    GorusmeyeDavetQuestions,
    KovusturmaOlumluUzlastirmaRaporuQuestions,
    KovusturmaOlumsuzUzlastirmaRaporuQuestions,
    KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    SegbisGorusmeTalepQuestions,
    SorusturmaOlumluUzlastirmaRaporuQuestions,
    SorusturmaOlumsuzUzlastirmaRaporuQuestions,
    SorusturmaUzlastirmaciGorusmeTutanagiQuestions,
    TalimatYazisiTalepQuestions,
    TesimVeMasrafBelgesiQuestions,
} from './docx';
import {UzlasmaTeklifFormuQuestions} from './pdf';

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
