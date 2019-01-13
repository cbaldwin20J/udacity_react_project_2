// puts all of our user objects into the store's state

import { INITIAL_USERS } from '../actions/initialData'
import { SAVE_ANSWER } from '../actions/saveQuestionAnswer'
import {SAVE_QUESTION} from '../actions/saveQuestion'

export default function users (state = {}, action) {
  switch(action.type) {

    // when the user signs in, will load the users from the database into the state
    case INITIAL_USERS :
      return {
        ...state,
        ...action.users
      }

    // saves the users answer to a question
    case SAVE_ANSWER :
    	const user_id = action.user_id
  		const question_id = action.question_id
  		const users_answer = action.users_answer

    	return {
    		...state,
    		[user_id] : {
    			...state[user_id],
    			'answers' : {
    			...state[user_id].answers, [question_id]: users_answer
    			}
    		}
    	}

    // if the user creates a new question
    case SAVE_QUESTION :
      return {
        ...state,
        [action.the_question_object.author]:{
          ...state[action.the_question_object.author],
          questions:[
            ...state[action.the_question_object.author]['questions'],
            action.the_question_object.id
          ]
        }
      }

    default :
      return state
  }
}

