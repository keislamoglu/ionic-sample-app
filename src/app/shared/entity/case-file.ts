import {CaseFileType} from './case-file-type';
import {CourtHouse} from './court-house';
import {AttorneyGeneralship} from './attorney-generalship';
import {Party} from './party';
import {ExtensionTime} from './extension-time';

export class CaseFile {
    id: string;
    /**
     * Investigation or prosecution file no
     */
    fileNo: string;
    conciliationNo: string;
    /**
     * Discounts from 30 days
     */
    conciliationStartDate: string;
    chargeDate: string;
    courtHouseId: string;
    attorneyGeneralshipId: string;
    type: CaseFileType;
    courtHouse?: CourtHouse;
    attorneyGeneralship?: AttorneyGeneralship;
    /**
     * Stand for all parties which are related to the case file.
     */
    parties: Party[] = [];
    extensionTimes: ExtensionTime[] = [];
}
