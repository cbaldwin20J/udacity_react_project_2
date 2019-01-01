import { LOGGED_IN, LOGGED_OUT } from '../actions/loggedIn'

// puts a variable 'tweets' in the state. The 'state' parameter is only for this variable
// not for all the variables in the state.
export default function loggedIn (state = false, action) {
  switch(action.type) {
    case LOGGED_IN :
      return true
    case LOGGED_OUT :
      return false

    default :
      return state
  }
}