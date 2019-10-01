import {CaseFileType} from './case-file-type';

export class CaseFile {
    id: string;
    fileNo: string; // Soruşturma veya kovuşturma dosya numarası
    conciliationNo: string; // Uzlaştırma no
    conciliationStartDate: string; // Discount from 30 days
    chargeDate: string; // Görevlendirme tarihi
    courtHouseId: string;
    attorneyGeneralshipId: string;
    type: CaseFileType; // Dosya tipi (soruşturma veya kovuşturma)
}
