import _ from 'lodash'
import { 
	GET_POSTS,
	GET_POSTS_BY_CATEGORY,
	GET_POST,
	ADD_POST, 
	DELETE_POST, 
	VOTE_POST
} from '../actions'

export default function (state = {}, action) {
	
	switch(action.type) {
		case GET_POSTS:
			console.log(action.type)
			return [...action.posts]
		case GET_POSTS_BY_CATEGORY:
			console.log(action.type)	
			return [...action.posts]
		case GET_POST:
			console.log(action.type)
			return action.post
		case ADD_POST:
			console.log(action.type)
			return [...state,action.post]
		case DELETE_POST:
			console.log(action.type)
			return _.omit(state, action.post.id)
		case VOTE_POST:
			console.log(action.type)
			return [
				...state,
				action.post
			]
		default:
			return state
	}
}