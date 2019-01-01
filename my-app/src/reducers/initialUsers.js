import { INITIAL_QUESTIONS, INITIAL_USERS } from '../actions/initialData'

// puts a variable 'tweets' in the state. The 'state' parameter is only for this variable
// not for all the variables in the state.
export default function users (state = {}, action) {
  switch(action.type) {
    case INITIAL_USERS :
      return {
        ...state,
        ...action.users
      }

    default :
      return state
  }
}