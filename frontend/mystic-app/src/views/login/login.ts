/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import {
	Frame
} from '@nativescript/core/ui/frame';

import {
	EventData,
	Page,
	TextField
} from '@nativescript/core';

//import userViewModel from '../../shared/viewModels/userViewModel';

import {
	UserViewImpl
} from '../../viewModels/UserViewImpl';

let page : Page;

//const user = userViewModel();
const user = new UserViewImpl();

export function loaded(args: EventData) {
	console.log("Login", "View loaded");
	page = <Page>args.object;
	page.bindingContext = user;
}

export function login() {
	user.login();
	/* user.login().then(() => {
		console.log('Logged in');
	}).catch(ex => {
		console.warn('Not logged in', ex);
	}); */
}

export function register() {
	user.create();
	/*const topmostFrame : Frame = Frame.topmost();
	topmostFrame.navigate('views/register/register');*/
}
