import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../shared/services';
import {NavController} from '@ionic/angular';
import {Party, Person, Petition} from '../../shared/entity';
import {switchMap} from 'rxjs/operators';
import {PartyEditModalComponent} from '../edit/party-edit-modal.component';
import {zip} from 'rxjs';
import {PetitionEditModalComponent} from '../../+petitions/edit/petition-edit-modal.component';
import {PartyService, PersonService, PetitionService} from '../../shared/repositories';

@Component({
    templateUrl: './party-detail.component.html'
})
export class PartyDetailComponent implements OnInit {
    id: string;
    party: Party | null = null;
    person: Person | null = null;
    petitions: Petition[] = [];

    constructor(private _route: ActivatedRoute,
                private _partyService: PartyService,
                private _petitionService: PetitionService,
                private _personService: PersonService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }


    async addPetition() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {
            partyId: this.id,
        });
        await modal.onWillDismiss();
        this._loadData();
    }

    navToPetition(petitionId: string) {
        this._navController.navigateForward(`/petitions/${petitionId}`);
    }

    navToPetitions() {
        this._navController.navigateForward(`/parties/${this.id}/petitions`);
    }

    async edit() {
        const modal = await this._modalService.present(PartyEditModalComponent, {id: this.id});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    private _loadData() {
        this._partyService.get(this.id).pipe(
            switchMap(party => {
                this.party = party;
                return zip(
                    this._personService.get(party.personId),
                    this._petitionService.getByParty(party.id)
                );
            })
        ).subscribe(val => [this.person, this.petitions] = val);
    }

    navToPersonDetail(personId: string) {
        this._navController.navigateForward(`persons/${personId}`);
    }

    personFullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(t => t).join(' ');
    }
}
