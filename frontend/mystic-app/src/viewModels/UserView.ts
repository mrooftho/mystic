import {
	User
} from '../models';

export default interface UserView extends User {
	login(): Promise<void>,
	create(): Promise<void>
}
