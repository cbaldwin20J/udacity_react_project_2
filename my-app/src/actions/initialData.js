
import { _getQuestions, _getUsers } from '../utils/_DATA'

export const INITIAL_QUESTIONS = "INITIAL_QUESTIONS"
export const INITIAL_USERS = "INITIAL_USERS"


function storeQuestions(questions){
  return {
    type: INITIAL_QUESTIONS,
    questions,
  }
}


export function handleInitialQuestions () {
  return (dispatch) => {
    return _getQuestions()
      .then((questions) => {
        dispatch(storeQuestions(questions))

      })
  }
}



function storeUsers(users){
  return {
    type: INITIAL_USERS,
    users,
  }
}

export function handleInitialUsers () {
  return (dispatch) => {
    return _getUsers()
      .then((users) => {
        dispatch(storeUsers(users))

      })
  }
}