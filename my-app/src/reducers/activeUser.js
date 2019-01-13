import { ACTIVATE_USER, LOG_OUT } from '../actions/activeUser'

// sets whoever is the logged in user into our store's state as activeUser
export default function activeUser (state = false, action) {
  switch(action.type) {

    case ACTIVATE_USER :
      return action.active_user

    case LOG_OUT:
      return null

    default :
      return state
  }
}