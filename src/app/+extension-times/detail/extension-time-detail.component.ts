import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../shared/services';
import {ExtensionTime} from '../../shared/entity';
import {ExtensionTimeEditModalComponent} from '../edit/extension-time-edit-modal.component';
import {ExtensionTimeHelper, getDateDiff} from '../../shared/helpers';
import {NavController} from '@ionic/angular';
import {ExtensionTimeService} from '../../shared/repositories';

@Component({
    templateUrl: './extension-time-detail.component.html'
})
export class ExtensionTimeDetailComponent implements OnInit {
    id: string;
    extensionTime: ExtensionTime;
    remainingTime = 0;

    constructor(private _route: ActivatedRoute,
                private _extensionTimeService: ExtensionTimeService,
                private _modalService: ModalService,
                private _navController: NavController) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    async edit() {
        const modal = await this._modalService.present(ExtensionTimeEditModalComponent, {id: this.id});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    private _loadData() {
        this._extensionTimeService.get(this.id)
            .subscribe(extensionTime => {
                this.extensionTime = extensionTime;
                const dateDiff = getDateDiff(new Date(), ExtensionTimeHelper.getDurationAddedDate(extensionTime));
                if (dateDiff > 0) {
                    this.remainingTime = dateDiff;
                }
            });
    }
}
