import { _saveQuestion } from '../utils/_DATA'

export const SAVE_QUESTION = 'SAVE_QUESTION'

export function saveQuestionActionObject(the_question_object) {
  return {
    type: SAVE_QUESTION,
    the_question_object
  }
}

export function saveQuestion(question) {

  return (dispatch) => {




    return _saveQuestion(question)
      .then((the_question) => dispatch(saveQuestionActionObject(the_question)))
      .catch((e) => {
        console.warn('Error in _saveQuestion: ', e);

        alert('The was an error saving your question. Try again.');
      })
  }
}