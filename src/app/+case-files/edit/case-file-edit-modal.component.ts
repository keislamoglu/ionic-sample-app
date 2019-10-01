import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService} from '../../shared/services';
import {AttorneyGeneralshipService, CaseFileService, CourtHouseService, PersonService} from '../../shared/repositories';
import {AttorneyGeneralship, CaseFile, CaseFileType, CourtHouse} from '../../shared/entity';
import {EnumList, enumList} from '../../shared/helpers';
import {switchMap} from 'rxjs/operators';

@Component({
    templateUrl: './case-file-edit-modal.component.html'
})
export class CaseFileEditModalComponent implements OnInit {
    @Input() id: string;
    caseFile: CaseFile | null = null;
    // Data sets
    caseFileTypeDataset: EnumList<typeof CaseFileType> = enumList(CaseFileType);
    courtHouses: CourtHouse[] = [];
    attorneyGeneralships: AttorneyGeneralship[] = [];

    constructor(private _modalController: ModalController,
                private _caseFileService: CaseFileService,
                private _personService: PersonService,
                private _courtHouseService: CourtHouseService,
                private _attorneyGeneralshipService: AttorneyGeneralshipService,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
        this.loadData();
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
    }

    dismiss(removed: boolean = false) {
        this._modalController.dismiss({removed});
    }

    new() {
        this.caseFile = new CaseFile();
    }

    edit(id: string) {
        this._caseFileService.get(id).subscribe(caseFile => this.caseFile = caseFile);
    }

    save() {
        if (this.id) {
            this._caseFileService.update(this.id, this.caseFile).subscribe(() => this.dismiss());
            return;
        }
        this._caseFileService.add(this.caseFile).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        // TODO: remove related parties too
        this._alertService.confirm({
            title: 'Dava dosyası sil',
            message: `<strong>${this.caseFile.fileNo}</strong> dosyasını silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    onTypeChange(type: CaseFileType) {
        if (type === CaseFileType.Prosecution) {
            this.caseFile.courtHouseId = void 0;
        }

        if (type === CaseFileType.Investigation) {
            this.caseFile.attorneyGeneralshipId = void 0;
        }
    }

    loadData() {
        this._courtHouseService.getAll().subscribe(courtHouses => this.courtHouses = courtHouses);
        this._attorneyGeneralshipService.getAll().subscribe(attorneyGeneralships => this.attorneyGeneralships = attorneyGeneralships);
    }

    private _remove() {
        this._caseFileService.remove(this.caseFile.id)
            .subscribe(() => this.dismiss(true));
    }
}
