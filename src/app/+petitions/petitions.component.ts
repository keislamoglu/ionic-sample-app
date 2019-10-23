import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from './edit/petition-edit-modal.component';
import {Petition} from '../shared/entity';
import {ModalService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {PetitionService} from '../shared/repositories';
import {getGrouped} from '../shared/helpers';

@Component({
    selector: 'app-petitions',
    templateUrl: './petitions.component.html',
    styleUrls: ['./petitions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionsComponent implements OnInit {
    @Input() caseFileId: string;

    partyId: string;
    petitions: Petition[] = [];
    groupedPetitions: Array<Petition[]> = [];
    itemCountPerRow = 2;
    columnSize = 12 / this.itemCountPerRow;

    constructor(private _modalService: ModalService,
                private _petitionService: PetitionService,
                private _navController: NavController,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`/petitions/${id}`);
    }

    async create() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {caseFileId: this.caseFileId});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    async edit(id: string) {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id, caseFileId: this.caseFileId});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._petitionService.getByCaseFile(this.caseFileId).subscribe(petitions => {
            this.petitions = petitions;
            const visualPetitions = [null, ...petitions];
            this.groupedPetitions = getGrouped(visualPetitions, this.itemCountPerRow);
            this._changeDetectorRef.markForCheck();
        });
    }
}
