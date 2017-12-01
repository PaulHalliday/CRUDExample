import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { ActionSheetService } from '../../services/action-sheet.service';
import { Item } from '../../models/item.view-model';
import { findIndex } from 'rxjs/operators/findIndex';
import { User } from '../../models/user.model';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	items: Array<Item>;

	constructor(private data: DataService, private actionSheet: ActionSheetService, private events: Events) {
		this.data.getData().subscribe(items => (this.items = items));

		this.events.subscribe('item:delete', selectedItem => {
			this.items = this.data.removeItem(this.items, selectedItem);
		});

		this.events.subscribe('item:edit', (selectedItem: Item) => {
			this.items = this.data.mergeItems(this.items, selectedItem);
		});
	}

	openActionSheet(selectedItem: Item) {
		this.actionSheet.present(selectedItem);
	}
}
