import { GET_CATEGORIES } from './types'
import { ROOT_URL, headers } from './constants'

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