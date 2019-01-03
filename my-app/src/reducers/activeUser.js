import { ACTIVATE_USER } from '../actions/activeUser'

// puts a variable 'tweets' in the state. The 'state' parameter is only for this variable
// not for all the variables in the state.
export default function activeUser (state = false, action) {
  switch(action.type) {
    case ACTIVATE_USER :
      return action.active_user

    default :
      return state
  }
}