import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ModalService} from '../shared/services';
import {Party, Person} from '../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, NavController} from '@ionic/angular';
import {PartyEditModalComponent} from './edit/party-edit-modal.component';
import {PersonEditModalComponent} from '../+persons/edit/person-edit-modal.component';
import {getGrouped} from '../shared/helpers';
import {switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {PartyService, PersonService} from '../shared/repositories';

@Component({
    templateUrl: './parties.component.html',
    styleUrls: ['./parties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartiesComponent implements OnInit {
    caseFileId: string;
    parties: Party[] = [];
    persons: Person[] = [];
    groupedParties: Array<Party[]> = [];
    itemCountPerRow = 2;
    columnSize = 12 / this.itemCountPerRow;

    constructor(private _route: ActivatedRoute,
                private _modalService: ModalService,
                private _partyService: PartyService,
                private _personService: PersonService,
                private _actionSheetController: ActionSheetController,
                private _navController: NavController,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._loadData();
    }

    async create() {
        const actionSheet = await this._actionSheetController.create({
            header: 'Taraf Ekle',
            buttons: [
                {
                    text: 'Varolan kişiyle',
                    handler: () => {
                        this.createUsingExistingPerson();
                    }
                },
                {
                    text: 'Yeni kişi oluşturarak',
                    handler: () => {
                        this.createWithNewPerson();
                    }
                },
                {
                    text: 'Vazgeç',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    async createWithNewPerson() {
        const modal = await this._modalService.present(PersonEditModalComponent);
        const res = await modal.onWillDismiss();
        if (!res.data.cancelled && res.data.id) {
            this.createUsingExistingPerson(res.data.id);
        }
    }

    async createUsingExistingPerson(personId?: string) {
        const modal = await this._modalService.present(PartyEditModalComponent, {
            caseFileId: this.caseFileId,
            personId: personId
        });
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._partyService.getByCaseFile(this.caseFileId).pipe(
            switchMap(parties => {
                this.parties = parties;
                return forkJoin(parties.map(party => this._personService.get(party.personId)));
            }),
        ).subscribe(persons => {
            this.persons = persons;
            const visualParties = [null, ...this.parties];
            this.groupedParties = getGrouped(visualParties, this.itemCountPerRow);
            this._changeDetectorRef.markForCheck();
        });
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/parties/${id}`);
    }

    personName(party: Party) {
        const person = this.persons.find(t => t.id === party.personId);
        return person
            ? PersonService.FullName(person)
            : '';
    }
}
