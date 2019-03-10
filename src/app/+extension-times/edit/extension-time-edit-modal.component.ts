import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertService, ExtensionTimeService} from '../../shared/services';
import {ExtensionTime} from '../../shared/entity';

@Component({
    templateUrl: './extension-time-edit-modal.component.html'
})
export class ExtensionTimeEditModalComponent implements OnInit {
    @Input() id: string;
    @Input() caseFileId: string;
    extensionTime: ExtensionTime | null = null;

    get date(): string {
        return this.extensionTime.date
            ? this.extensionTime.date.toISOString()
            : void 0;
    }

    set date(value: string) {
        this.extensionTime.date = new Date(value);
    }

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

    dismiss() {
        this._modalController.dismiss();
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
        this._extensionTimeService.remove(this.id).subscribe(() => this.dismiss());
    }
}
