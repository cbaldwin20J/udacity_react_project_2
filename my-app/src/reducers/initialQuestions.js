// puts all of our question objects into our store's state

import { INITIAL_QUESTIONS } from '../actions/initialData'
import {SAVE_ANSWER} from '../actions/saveQuestionAnswer'
import {SAVE_QUESTION} from '../actions/saveQuestion'

export default function questions (state = {}, action) {
  switch(action.type) {

    case INITIAL_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

    // save the users answer to a question
    case SAVE_ANSWER :
      // to save an answer, we have to erase the record if it was previously answered
      const question_id = action.question_id
      const users_answer = action.users_answer
      const user_id = action.user_id
      let other_option = ''
      if(users_answer == "optionOne"){
        other_option = "optionTwo"
      }else{
        other_option = "optionOne"
      }
      // makes sure the user doesn't have a recorded answer in the other option
      let other_option_votes_array = state[question_id][other_option]['votes'].filter(userID => userID != user_id)

      return {
        ...state,
        [question_id] : {
          ...state[question_id],
          [users_answer] : {
            ...state[question_id][users_answer],
            'votes' :
              [...state[question_id][users_answer]['votes'], user_id]

          },
          [other_option] : {
            ...state[question_id][other_option],
            'votes' :
              [...other_option_votes_array]

          }
        }
      }

    // if the user creates a new question
    case SAVE_QUESTION:

      return {
        ...state,
        [action.the_question_object.id]:{
          ...action.the_question_object
        }
      }

    default :
      return state
  }
}
