import { combineReducers } from 'redux'

import {
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	VOTE_POST,
	ADD_COMMENT,
	EDIT_COMMENT,
	DELETE_COMMENT
} from '../actions'

function categories (state = {}, action) {
	
}

function posts (state = {}, action) {

}

function comments (state = {}, action) {
	
}

export default combineReducers({
	categories,
	posts,
	comments,
})