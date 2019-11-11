import {TemplateDocument} from '../shared/constants';
import {
    GorusmelerinYapilamadiginaDairTutanakQuestions,
    GorusmeyeDavetQuestions,
    KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    SegbisGorusmeTalepQuestions,
    SorusturmaUzlastirmaciGorusmeTutanagiQuestions,
    TalimatYazisiTalepQuestions,
    TesimVeMasrafBelgesiQuestions,
} from './docx';
import {UzlasmaTeklifFormuQuestions, UzlastirmaRaporuQuestions,} from './pdf';

export const TemplateQuestions = {
    [TemplateDocument.UzlasmaGorusmesineDavet]: GorusmeyeDavetQuestions,
    [TemplateDocument.SegbisGorusmeTalep]: SegbisGorusmeTalepQuestions,
    [TemplateDocument.UzlasmaGorusmesineDavet]: [],
    [TemplateDocument.KovusturmaUzlastirmaciGorusmeTutanagi]: KovusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.SorusturmaUzlastirmaciGorusmeTutanagi]: SorusturmaUzlastirmaciGorusmeTutanagiQuestions,
    [TemplateDocument.TalimatYazisiTalep]: TalimatYazisiTalepQuestions,
    [TemplateDocument.TesimVeMasrafBelgesi]: TesimVeMasrafBelgesiQuestions,
    [TemplateDocument.GorusmelerinYapilamadiginaDairTutanak]: GorusmelerinYapilamadiginaDairTutanakQuestions,

    [TemplateDocument.UzlasmaTeklifFormu]: UzlasmaTeklifFormuQuestions,
    [TemplateDocument.UzlastirmaRaporu]: UzlastirmaRaporuQuestions,
};
