import {NavController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {CaseFileService, PersonService} from '../../shared/services';
import {CaseFile, Person} from '../../shared/entity';
import {switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CaseFileEditModalComponent} from '../edit/case-file-edit-modal.component';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    templateUrl: './case-file-detail.component.html',
})
export class CaseFileDetailComponent implements OnInit {
    id: string;
    caseFile: CaseFile;
    claiment: Person;
    defendant: Person;

    constructor(
        private _route: ActivatedRoute,
        private _caseFileService: CaseFileService,
        private _personService: PersonService,
        private _navController: NavController,
        private _modalService: ModalService) {
    }

    navPersonDetail(person: Person): void {
        this._navController.navigateForward(`/persons/${person.id}`);
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    async edit() {
        const modal = await this._modalService.present(CaseFileEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._caseFileService.get(this.id).pipe(
            switchMap(caseFile => {
                this.caseFile = caseFile;
                return zip(
                    this._personService.get(caseFile.claimentId),
                    this._personService.get(caseFile.defendantId),
                );
            }),
        ).subscribe(val => {
            [this.claiment, this.defendant] = val;
        });
    }

    private _personFullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }
}
