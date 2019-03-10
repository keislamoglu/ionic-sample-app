import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    constructor(private _navController: NavController) {
    }

    navToCaseFiles() {
        this._navController.navigateForward('/case-files');
    }

    navToPersons() {
        this._navController.navigateForward('/persons');
    }
}
