import { _saveQuestionAnswer } from '../utils/_DATA'

export const SAVE_ANSWER = 'SAVE_ANSWER'

// saves users answer to a question in the store's state
export function saveAnswerActionObject(users_answer, question_id, user_id) {
  return {
    type: SAVE_ANSWER,
    users_answer,
    question_id,
    user_id
  }
}

// saves users answer to a question to the database
export function saveAnswer(user_id, question_id, users_answer) {
  return (dispatch) => {
    const authedUser = user_id
    const qid = question_id
    const answer = users_answer
    return _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => dispatch(saveAnswerActionObject(users_answer, question_id, user_id)))
      .catch((e) => {
        console.warn('Error in _saveQuestion: ', e);
        alert('The was an error saving your answer. Try again.');
      })
  }
}