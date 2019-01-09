import { INITIAL_QUESTIONS } from '../actions/initialData'
import {SAVE_ANSWER} from '../actions/saveQuestionAnswer'

const reset_votes = (user_id, votes_array) => {

};

export default function questions (state = {}, action) {
  switch(action.type) {
    case INITIAL_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

     case SAVE_ANSWER :
      const question_id = action.question_id
      const users_answer = action.users_answer
      const user_id = action.user_id
      let other_option = ''
      if(users_answer == "optionOne"){
        other_option = "optionTwo"
      }else{
        other_option = "optionOne"
      }
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
              [other_option_votes_array]

          }
        }
      }

    default :
      return state
  }
}

// users_answer, question_id, user_id

// 1) questions[question.id].optionOne/optionTwo.votes then add on array [authed_user.id]

// need to account for deleting previous optionOne/optionTwo and then replace with new