import UserView from './userView';

import {
	Observable
} from '@nativescript/core/data/observable';

import {
	ObservableProperty
} from '../utils/observableDecorators';

import {
	UserService
} from '../services';

export class UserViewImpl extends Observable implements UserView {
	@ObservableProperty()
	public username : string;
	@ObservableProperty()
	public password : string;
	@ObservableProperty()
	public confirmPassword?: String

	constructor() {
		super();
	}

	async login() : Promise<void> {
		console.log(this.username, this.password);
		UserService.login(this);
	}

	async create() : Promise<void> {
		this.username = "bo";
	}
}
