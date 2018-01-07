import { 
	GET_POSTS,
	GET_POSTS_BY_CATEGORY,
	GET_POST,
	ADD_POST, 
	UPDATE_POST, 
	DELETE_POST, 
	VOTE_POST
} from '../actions/types'
import { turnArrayToObject } from '../utils/helpers'

export default function (state = {}, action) {
	
	switch(action.type) {
		case GET_POSTS:
			console.log(action.type)
			return turnArrayToObject(action.posts)
		case GET_POSTS_BY_CATEGORY:
			console.log(action.type)	
			return turnArrayToObject(action.posts)
		case GET_POST:
			console.log(action.type)
			return { ...state,
					[action.post.id]: action.post}
		case ADD_POST:
			console.log(action.type)
			return { ...state,
					[action.post.id]: action.post}
		case UPDATE_POST:
			console.log(action.type)
			return { ...state,
					[action.post.id]: action.post}
		case DELETE_POST:
			console.log(action.type)
			delete state[action.post.id]
			return {...state}
		case VOTE_POST:
			console.log(action.type)
			return { ...state,
					[action.post.id]: action.post}
		default:
			return state
	}
}