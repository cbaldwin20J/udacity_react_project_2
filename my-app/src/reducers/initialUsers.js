import { INITIAL_USERS } from '../actions/initialData'
import { SAVE_ANSWER } from '../actions/saveQuestionAnswer'
import {SAVE_QUESTION} from '../actions/saveQuestion'



// puts a variable 'tweets' in the state. The 'state' parameter is only for this variable
// not for all the variables in the state.
export default function users (state = {}, action) {


  switch(action.type) {
    case INITIAL_USERS :
      return {
        ...state,
        ...action.users
      }

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

// users[authed_user.id].answers then add on object {question.id: “optionOne/optionTwo”}
// users_answer, question_id, user_id