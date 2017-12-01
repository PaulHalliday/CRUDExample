import { Injectable } from '@angular/core';
import { ActionSheetController, Events } from 'ionic-angular';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';

@Injectable()
export class ActionSheetService {
	constructor(private actionSheet: ActionSheetController, private events: Events, private dialog: DialogService) {}

	present(selectedItem: any) {
		let actionSheet = this.actionSheet
			.create({
				title: 'Actions',
				buttons: [
					{
						text: 'Delete',
						role: 'destructive',
						handler: () => {
							this.events.publish('item:delete', selectedItem);
						}
					},
					{
						text: 'Edit',
						handler: () => {
							this.dialog.openPrompt(selectedItem);
						}
					},
					{
						text: 'Cancel',
						role: 'Cancel',
						handler: () => {
							console.log('Cancel clicked.');
						}
					}
				]
			})
			.present();
	}
}
