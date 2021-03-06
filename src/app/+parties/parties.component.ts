import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../shared/services';
import {Party, Person} from '../shared/entity';
import {ActionSheetController, NavController} from '@ionic/angular';
import {PartyEditModalComponent} from './edit/party-edit-modal.component';
import {PersonEditModalComponent} from '../+persons/edit/person-edit-modal.component';
import {getGrouped} from '../shared/helpers';
import {switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {PartyService, PersonService} from '../shared/repositories';
import {fullName} from '../shared/helpers';

@Component({
    selector: 'app-parties',
    templateUrl: './parties.component.html',
    styleUrls: ['./parties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartiesComponent implements OnInit {
    @Input() caseFileId: string;
    parties: Party[] = [];
    persons: Person[] = [];
    groupedParties: Array<Party[]> = [];
    itemCountPerRow = 2;
    columnSize = 12 / this.itemCountPerRow;

    constructor(private _modalService: ModalService,
                private _partyService: PartyService,
                private _personService: PersonService,
                private _actionSheetController: ActionSheetController,
                private _navController: NavController,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
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
                const visualParties = [null, ...parties];
                this.groupedParties = getGrouped(visualParties, this.itemCountPerRow);
                this._changeDetectorRef.markForCheck();
                return parties.length > 0
                    ? forkJoin(parties.map(party => this._personService.get(party.personId)))
                    : of([]);
            }),
        ).subscribe(persons => {
            this.persons = persons;
            // const visualParties = [null, ...this.parties];
            // this.groupedParties = getGrouped(visualParties, this.itemCountPerRow);
            this._changeDetectorRef.markForCheck();
        });
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/parties/${id}`);
    }

    personName(party: Party) {
        const person = this.persons.find(t => t.id === party.personId);
        return person
            ? fullName(person)
            : '';
    }
}
