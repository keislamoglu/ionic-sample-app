import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PickerController} from '@ionic/angular';

@Component({
    selector: 'app-info-tag',
    templateUrl: './info-tag.component.html',
    styleUrls: ['./info-tag.component.scss']
})
export class InfoTagComponent<T extends { [key in keyof T]: string }> {
    @Input() tagLabel: string;
    @Input() tagName: string;
    @Input() dataSet: Array<T> = [];
    @Input() valueProp: keyof T;
    @Input() labelProp: string;
    @Output() selected = new EventEmitter<T>();
    selectedItem: T | null = null;

    constructor(private _pickerCtrl: PickerController) {
    }

    isSelected() {
        return this.selectedItem !== null;
    }

    select(value: string): void {
        const item = this.dataSet.find(x => this.getValue(x) === value);
        if (item) {
            this.selectedItem = item;
            this.selected.emit(this.selectedItem);
        }
    }

    getValue(item: T): string {
        return item[this.valueProp];
    }

    getLabel(item: T): string {
        return item[this.labelProp];
    }

    async openPicker() {
        const options = this.dataSet
            .map(item => ({
                text: this.getLabel(item),
                value: this.getValue(item),
            }));
        let selectedIndex;
        if (this.selectedItem) {
            const selectedValue = this.getValue(this.selectedItem);
            selectedIndex = this.dataSet.findIndex(x => this.getValue(x) === selectedValue);
        }
        const column = {name: this.tagName, options, selectedIndex};

        const picker = await this._pickerCtrl.create({
            buttons: [{text: 'Seç', handler: value => this.select(value[this.tagName].value)}],
            columns: [column]
        });

        await picker.present();
    }
}
