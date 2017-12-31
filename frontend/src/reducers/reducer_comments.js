import { GET_COMMENTS, GET_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions';

function turnArrayToObject(arr) {
	return arr.reduce((obj,item) => {
		obj[item.id]=item
		return obj
	},{})
}

export default function (state = {}, action) {
  switch (action.type) {

    case GET_COMMENTS:
	  console.log(action.type)
      return turnArrayToObject(action.comments)
    case GET_COMMENT:
	  console.log(action.type)
      return {...state,
		  	  [action.comment.id]: action.comment}
    case ADD_COMMENT:
	  console.log(action.type)
      return {...state, 
			  [action.comment.id]: action.comment }
    case UPDATE_COMMENT:
	  console.log(action.type)
      return {...state, 
			  [action.comment.id]: action.comment }
    case DELETE_COMMENT:
	  console.log(action.type)
	  delete state[action.comment.id]
      return {...state} 	  
    case VOTE_COMMENT:
	  console.log(action.type)
	  return { ...state,
			  [action.comment.id]: action.comment}

    default:
      return state;
  }
}