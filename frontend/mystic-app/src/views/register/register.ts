import {
	EventData,
	Page
} from '@nativescript/core';

import {
	fromObject
} from '@nativescript/core/data/observable';

let page : Page;

const newUser = fromObject({
	email: "user@mail.com",
	password: "password",
	confirmPassword: "password"
});

export function loaded(args: EventData) {
	console.log("Register", "View loaded");
	page = <Page>args.object;
	page.bindingContext = newUser;
}

export function create () {
	console.log('The guy taps on create!');
}
