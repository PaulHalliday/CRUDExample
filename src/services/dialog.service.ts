import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Item } from '../models/item.view-model';
@Injectable()
export class DialogService {
	constructor(private alert: AlertController, private events: Events) {}

	openPrompt(selectedItem: Item) {
		const prompt = this.alert
			.create({
				title: 'Edit Title',
				message: 'Add a new user name.',
				inputs: [
					{
						name: 'name',
						placeholder: 'Name'
					}
				],
				buttons: [
					{
						text: 'Cancel',
						handler: data => {
							console.log('Cancel clicked!');
						}
					},
					{
						text: 'Save',
						handler: data => {
							const newUser = {
								...selectedItem.users,
								name: data.name
							};

							const newItem = Object.assign(
								{},
								{
									albums: selectedItem.albums,
									posts: selectedItem.posts,
									users: newUser
								}
							);

							this.events.publish('item:edit', newItem);
						}
					}
				]
			})
			.present();
	}
}
