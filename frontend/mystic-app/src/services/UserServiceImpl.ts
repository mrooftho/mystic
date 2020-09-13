import {
	fetch
} from '@nativescript/core/fetch';

import UserService from './userService';

import {
	User
} from '../models';

import config from '../config';

class UserServiceImpl implements UserService {

	private baseURL : string;

	constructor() {
		const {
			apiUrl,
			apiStage
		} = config;
		this.baseURL = `${apiUrl}/${apiStage}/v1/user`;
	}

	private async errorHelper (response) {
		if (response.ok) {
			console.log('userViewModel', 'Response', JSON.stringify(response));
			return response;
		}
		console.warn('userViewModel', 'Error response', JSON.stringify(response));
		throw Error(response.statusText);
	}

	async login(data : User) : Promise<void> {
		return fetch(
			`${this.baseURL}/login`,
			{
					method: 'POST',
					body: JSON.stringify({
							username: data.username,
							password: data.password
					}),
					headers: {
							'Content-Type': 'application/json'
					}
			}
		)
		.then(this.errorHelper)
		.then(rsp => rsp.json());
	}


	async createUser(data: User) : Promise<void> {
		return fetch(
			this.baseURL,
			{
					method: 'POST',
					body: JSON.stringify({
							username: data.username,
							password: data.password
					}),
					headers: {
							'Content-Type': 'application/json'
					}
			}
		)
		.then(this.errorHelper);
	}

}

export default new UserServiceImpl();
