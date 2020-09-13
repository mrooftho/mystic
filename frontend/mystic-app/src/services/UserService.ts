import {
	User
} from '../models'

export default interface UserService {
	login(userData : User): Promise<void>,
	createUser(userData: User): Promise<void>
}
