import {
	Observable
} from '@nativescript/core/data/observable';

export interface User extends Observable {
	username: String,
	password: String,
	confirmPassword?: String
}

