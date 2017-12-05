import * as PostsAPI from '../../../api-server/posts'
import * as CommentsAPI from '../../../api-server/comments'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function addPost({token,post}) {
	PostsAPI.add(token,post).then(() => ({
		type: ADD_POST,
		post,
	})
}

export function editPost({token, id, post}) {
	PostsAPI.edit(token, id, post).then(() => ({
		type: EDIT_POST,
		id,
		post,
	})
}

export function deletePost({token, id}) {
	PostsAPI.disable(token, id).then(() => ({
		type: DELETE_POST,
		id,
	})
}

export function votePost({token, id, option}) {
	PostsAPI.vote(token, id, option).then(() => ({
		type: VOTE_POST,
		id,
	})
}

export function addComment({token, comment}) {
	CommentsAPI.add(token, comment).then(() => ({
		type: ADD_COMMENT,
		comment,
	})
}

export function editComment({token, id, comment}) {
	CommentsAPI.edit(token, id, comment).then(() => ({
		type: EDIT_COMMENT,
		id,
		comment,
	}
}

export function deleteComment({token, id}) {
	CommentsAPI.disable(token, id).then(() => ({
		type: DELETE_COMMENT,
		id,
	}
}

export function voteComment({token, id, option}) {
	CommentsAPI.vote(token, id, option).then(() => ({
		type: VOTE_COMMENT,
		id,
	}
}