import _ from 'lodash';
import { GET_COMMENTS, GET_COMMENT, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {

    case GET_COMMENTS:
      return action.comments
    case GET_COMMENT:
      return action.comment
	  
    case ADD_COMMENT:
      return {...state, [action.payload.id]: action.payload }
    case DELETE_COMMENT:
      return _.omit(state, action.payload)
    case EDIT_COMMENT:
      return _.omit(state, action.payload)	  
    case UPDATE_COMMENT:
      return {...state, [action.payload.id]: action.payload }
    case VOTE_COMMENT:
      return {...state, [action.result.id]: action.result }

    default:
      return state;
  }
}