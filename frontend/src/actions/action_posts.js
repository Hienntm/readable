import uuid from 'uuid'
import { GET_POSTS, GET_POSTS_BY_CATEGORY, GET_POST, ADD_POST, DELETE_POST, UPDATE_POST, VOTE_POST } from './types'
import { ROOT_URL, headers } from './constants'

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

export const addPost = (post, callback) => dispatch => {
	const { title, body, author, category } = post
	const data = {
		id: uuid(),
		timestamp: Date.now(),
		title,
		body,
		author,
		category
	}
	console.log(data)
	fetch(`${ROOT_URL}/posts`, {...headers, method: 'POST', body: JSON.stringify(data)})
	.then(res => res.json())
	.then(data => {
		dispatch(addPostActionCreator(data))
		callback()
	})
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

export const deletePost = (id, callback) => dispatch => {
	fetch(`${ROOT_URL}/posts/${id}`, {...headers, method: 'DELETE'})
	.then(res => res.json())
	.then(data => {
		dispatch(deletePostActionCreator(data))
		callback()
	})
}

function updatePostActionCreator(data) {
	return {
		type: UPDATE_POST,
		post: data
	}
}

export const updatePost = (id, post, callback) => dispatch => {
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
	.then(data => {
		dispatch(updatePostActionCreator(data))
		callback()
	})
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
