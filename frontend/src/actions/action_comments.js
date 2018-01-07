import uuid from 'uuid'
import { GET_COMMENTS, GET_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from './types'
import { ROOT_URL, headers } from './constants'

function getCommentsActionCreator(data) {
	return {
		type: GET_COMMENTS,
		comments: data
	}
}

export const getComments = postid => dispatch => {
	fetch(`${ROOT_URL}/posts/${postid}/comments`,headers)
	.then(res => res.json())
	.then(data => dispatch(getCommentsActionCreator(data)))
}

function getCommentActionCreator(data) {
	return {
		type: GET_COMMENT,
		comment: data
	}
}

export const getComment = id => dispatch => {
	fetch(`${ROOT_URL}/comments/${id}`,headers)
	.then(res => res.json())
	.then(data => dispatch(getCommentActionCreator(data)))
}

function addCommentActionCreator(data) {
	console.log(data)
	return {
		type: ADD_COMMENT,
		comment: data
	}
}

export const addComment = (comment, parentId) => dispatch => {
    const { body, author} = comment;
console.log(parentId)
    const data = {
        id: uuid(),
        timestamp: Date.now(),
        body,
        author,
		parentId,
    }
	fetch(`${ROOT_URL}/comments/`, {...headers, method: 'POST', body: JSON.stringify(data)})
	.then(res => res.json())
	.then(data => {
		dispatch(addCommentActionCreator(data))
	})
}

function updateCommentActionCreator(data) {
	return {
		type: UPDATE_COMMENT,
		comment: data
	}
}

export const updateComment = (id, comment) => dispatch => {
    const { body, author, id, parentId } = comment;

    const data = {
        id,
        timestamp: Date.now(),
        body,
        author,
		parentId
    }
	fetch(`${ROOT_URL}/comments/${id}`, {...headers, method: 'PUT', body: JSON.stringify(data)})
	.then(res => res.json())
	.then(data => {
		dispatch(updateCommentActionCreator(data))
	})
}
function deleteCommentActionCreator(data) {
	return {
		type: DELETE_COMMENT,
		comment: data
	}
}

export const deleteComment = id => dispatch => {
	fetch(`${ROOT_URL}/comments/${id}`, {...headers, method: 'DELETE'})
	.then(res => res.json())
	.then(data => dispatch(deleteCommentActionCreator(data)))
}

function voteCommentActionCreator(data) {
	return {
		type: VOTE_COMMENT,
		comment: data
	}
}

export const voteComment = (id, option) => dispatch => {
	const data = {
		option,
	}	
	fetch(`${ROOT_URL}/comments/${id}`, {...headers,  method: 'POST', body:JSON.stringify(data)})
	.then(res => res.json())
	.then(data => dispatch(voteCommentActionCreator(data)))
}
