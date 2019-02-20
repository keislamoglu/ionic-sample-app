import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {switchMap} from 'rxjs/operators';
import {AlertService, CaseFileService, PersonService} from '../../shared/services';
import {CaseFile, Person} from '../../shared/entity';

@Component({
    templateUrl: './case-file-modal.component.html',
    styleUrls: ['./case-file-modal.component.scss']
})
export class CaseFileModalComponent implements OnInit {
    @Input() id: string;
    caseFile: CaseFile | null = null;
    claiments: Person[] = [];
    defendants: Person[] = [];

    constructor(private modalController: ModalController,
                private _caseFileService: CaseFileService,
                private _personService: PersonService,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
        if (this.id) {
            this.edit(this.id);
            return;
        }
        this.new();
    }

    dismiss() {
        this._reset();
        this.modalController.dismiss();
    }

    new() {
        this._personService.getAll().subscribe(persons => {
            this.defendants = this.claiments = persons;
            this.caseFile = new CaseFile();
        });
    }

    edit(id: string) {
        this._personService.getAll().pipe(
            switchMap(persons => {
                this.defendants = this.claiments = persons;
                return this._caseFileService.get(id);
            })
        ).subscribe(caseFile => this.caseFile = caseFile);
    }

    save() {
        if (this.caseFile.id) {
            this._caseFileService.update(this.caseFile.id, this.caseFile).subscribe(() => this.dismiss());
            return;
        }
        this._caseFileService.add(this.caseFile).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Dava dosyası sil',
            message: `<strong>${this.caseFile.fileNo}</strong> dosyasını silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _remove() {
        this._caseFileService.remove(this.caseFile.id)
            .subscribe(() => this.dismiss());
    }

    private _reset() {
        this.caseFile = null;
    }

    private _personFullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
