import { USER } from '../constants/constants'

export function user(state = [], action) {
	switch (action.type) {
		case USER:
			return [
				...state,
				{
					user: action.user,
				}
			];
		default:
		return state
	}
}