import uuid from 'uuid';

const ROOT_URL = "http://localhost:3001"

const headers = {
	headers: { 'Authorization': 'aloha'}
}

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_POST = 'VOTE_POST'

export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENT = 'GET_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

function getCategoriesActionCreator(data) {
	return {
		type: GET_CATEGORIES,
		categories: data
	}
}

export const getCategories = () => dispatch => {
	fetch(`${ROOT_URL}/categories`, headers)
	.then(res => res.json())
	.then(data => dispatch(getCategoriesActionCreator(data.categories)))
}

function getPostsActionCreator(data) {
	return {
		type: GET_POSTS,
		posts: data
	}
}

export const getPosts = () => dispatch => {
	fetch(`${ROOT_URL}/posts`, headers)
	.then(res => res.json())
	.then(data => dispatch(getPostsActionCreator(data)))
}

function getPostsByCategoryActionCreator(data) {
	return {
		type: GET_POSTS_BY_CATEGORY,
		posts: data
	}
}

export const getPostsByCategory = category => dispatch => {
	fetch(`${ROOT_URL}/${category}/posts`, headers)
	.then(res => res.json())
	.then(data => dispatch(getPostsByCategoryActionCreator(data)))
}

function addPostActionCreator(data) {
	return {
		type: ADD_POST,
		post: data
	}
}

export const addPost = post => dispatch => {
	const { title, body, author, category } = post
	const data = {
		id: uuid(),
		timestamp: Date.now(),
		title,
		body,
		author,
		category
	}
	fetch(`${ROOT_URL}/posts`, {...headers, method: 'POST', body: JSON.stringify(data)})
	.then(res => res.json())
	.then(data => dispatch(addPostActionCreator(data)))
}

function getPostActionCreator(data) {
	return {
		type: GET_POST,
		post: data
	}
}

export const getPost = id => dispatch => {
	fetch(`${ROOT_URL}/posts/${id}`, headers)
	.then(res => res.json())
	.then(data => dispatch(getPostActionCreator(data)))
}

function deletePostActionCreator(data) {
	return {
		type: DELETE_POST,
		post: data
	}
}

export const deletePost = id => dispatch => {
	fetch(`${ROOT_URL}/posts/${id}`, {...headers, method: 'DELETE'})
	.then(res => res.json())
	.then(data => dispatch(deletePostActionCreator(data)))
}

function updatePostActionCreator(data) {
	return {
		type: UPDATE_POST,
		post: data
	}
}

export const updatePost = (id, post) => dispatch => {
    const { title, body, author, category, id } = post;

    const data = {
        id,
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
	fetch(`${ROOT_URL}/posts/${id}`, {...headers, method: 'PUT', body: JSON.stringify(data)})
	.then(res => res.json())
	.then(data => dispatch(updatePostActionCreator(data)))
}

function votePostActionCreator(data) {
	return {
		type: VOTE_POST,
		post: data		
	}
}

export const votePost = (id, option) => dispatch => {
	const data = {
		option,
	}
	fetch(`${ROOT_URL}/posts/${id}`, {...headers, method: 'POST', body:JSON.stringify(data)})
	.then(res => res.json())
	.then(data => dispatch(votePostActionCreator(data)))
}

function getCommentsActionCreator(data) {
	console.log(data)
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

export function voteComment(comment, option) {
	fetch(`${ROOT_URL}/comments/${comment}`, {...headers, body:JSON.stringigy({"option": option})})
	.then(res => ({
		type: VOTE_COMMENT,
		voteScore: res.data.voteScore
	}))
}

export function createComment(comment, parentId) {
	const { body, author } = comment
	const data = {
		id: uuid(),
		timestamp: Date.now(),
		body: body,
		author: author,
		parentId,
	}
	fetch(`${ROOT_URL}/comments`, data, headers)
	.then(res => ({
		type: ADD_COMMENT,
		comment: res.data
	}))
}
