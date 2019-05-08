import {Component, Input} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {
    @Input() contentId: string;

    constructor(private _navController: NavController,
                private _menuController: MenuController) {
    }

    async navToRoot(path: string) {
        await this._navController.navigateRoot(path);
        this._closeMenu();
    }

    async navToForward(path: string) {
        await this._navController.navigateForward(path);
        this._closeMenu();
    }

    private async _closeMenu() {
        const menu = await this._menuController.getOpen();
        if (menu) {
            this._menuController.close(menu.menuId);
        }
    }
}
