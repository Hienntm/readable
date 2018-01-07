import { GET_CATEGORIES } from '../actions/types'

export default function (state = {}, action) {
	switch(action.type) {
		case GET_CATEGORIES:
			console.log(action.type)
			return [...action.categories]
		default:
			return state
	}
}