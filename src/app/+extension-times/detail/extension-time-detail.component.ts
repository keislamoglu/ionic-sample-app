import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExtensionTimeService, ModalService} from '../../shared/services';
import {ExtensionTime} from '../../shared/entity';
import {ExtensionTimeEditModalComponent} from '../edit/extension-time-edit-modal.component';
import {getDateDiff} from '../../shared/helpers';

@Component({
    templateUrl: './extension-time-detail.component.html'
})
export class ExtensionTimeDetailComponent implements OnInit {
    id: string;
    extensionTime: ExtensionTime;
    remainingTime = 0;

    constructor(private _route: ActivatedRoute,
                private _extensionTimeService: ExtensionTimeService,
                private _modalService: ModalService) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    async edit() {
        const modal = await this._modalService.present(ExtensionTimeEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._extensionTimeService.get(this.id)
            .subscribe(extensionTime => {
                this.extensionTime = extensionTime;
                const dateDiff = getDateDiff(new Date(), ExtensionTimeService.getDateWithDuration(extensionTime));
                if (dateDiff > 0) {
                    this.remainingTime = dateDiff;
                }
            });
    }
}
