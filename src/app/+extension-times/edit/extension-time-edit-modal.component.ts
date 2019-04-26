import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService} from '../../shared/services';
import {ExtensionTime} from '../../shared/entity';
import {ExtensionTimeService} from '../../shared/repositories';

@Component({
    templateUrl: './extension-time-edit-modal.component.html'
})
export class ExtensionTimeEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() caseFileId: string;
    extensionTime: ExtensionTime | null = null;

    constructor(private _extensionTimeService: ExtensionTimeService,
                private _modalController: ModalController,
                private _alertService: AlertService) {
    }

    ngOnInit(): void {
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
        this.extensionTime = new ExtensionTime();
        this.extensionTime.caseFileId = this.caseFileId;
    }

    edit(id: string) {
        this._extensionTimeService.get(id).subscribe(extensionTime => {
            this.extensionTime = extensionTime;
        });
    }

    save() {
        if (this.id) {
            this._extensionTimeService.update(this.id, this.extensionTime).subscribe(() => this.dismiss());
            return;
        }

        this._extensionTimeService.add(this.extensionTime).subscribe(() => this.dismiss());
    }

    removeWithConfirm() {
        this._alertService.confirm({
            title: 'Ek süre sil',
            message: `Ek süreyi silmek istediğinize emin misiniz?`,
            cancel: {text: 'Vazgeç'},
            ok: {text: 'Sil', handler: () => this._remove()}
        });
    }

    private _remove() {
        this._extensionTimeService.remove(this.id)
            .subscribe(() => this.dismiss(true));
    }
}
