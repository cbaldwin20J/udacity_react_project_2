import { INITIAL_QUESTIONS } from '../actions/initialData'

// puts a variable 'tweets' in the state. The 'state' parameter is only for this variable
// not for all the variables in the state.
export default function questions (state = {}, action) {
  switch(action.type) {
    case INITIAL_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

    default :
      return state
  }
}