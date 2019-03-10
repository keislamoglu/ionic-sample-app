import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartyService, PersonService} from '../../shared/services';
import {ModalService} from '../../shared/services/modal.service';
import {NavController} from '@ionic/angular';
import {Party, Person} from '../../shared/entity';
import {switchMap} from 'rxjs/operators';
import {PartyEditModalComponent} from '../edit/party-edit-modal.component';

@Component({
    templateUrl: './party-detail.component.html'
})
export class PartyDetailComponent implements OnInit {
    id: string;
    party: Party | null = null;
    person: Person | null = null;

    constructor(private _route: ActivatedRoute,
                private _partyService: PartyService,
                private _personService: PersonService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    navToPetitions() {
        this._navController.navigateForward(`/parties/${this.id}/petitions`);
    }

    async edit() {
        const modal = await this._modalService.present(PartyEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._partyService.get(this.id).pipe(
            switchMap(party => {
                this.party = party;
                return this._personService.get(party.personId);
            })
        ).subscribe(person => this.person = person);
    }

    navToPersonDetail(personId: string) {
        this._navController.navigateForward(`persons/${personId}`);
    }

    personFullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(t => t).join(' ');
    }
}
