import { _getQuestions, _getUsers } from '../utils/_DATA'

export const INITIAL_QUESTIONS = "INITIAL_QUESTIONS"
export const INITIAL_USERS = "INITIAL_USERS"

// gets the questions and puts them in the state
function storeQuestions(questions){
  return {
    type: INITIAL_QUESTIONS,
    questions,
  }
}

// gets questions from the database
export function handleInitialQuestions () {
  return (dispatch) => {
    return _getQuestions()
      .then((questions) => {
        dispatch(storeQuestions(questions))

      })
  }
}


// puts users in store's state
function storeUsers(users){
  return {
    type: INITIAL_USERS,
    users,
  }
}

// gets users from database
export function handleInitialUsers () {
  return (dispatch) => {
    return _getUsers()
      .then((users) => {
        dispatch(storeUsers(users))

      })
  }
}