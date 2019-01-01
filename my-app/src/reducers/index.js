import { combineReducers } from 'redux'
import loggedIn from './loggedIn'
import questions from './initialQuestions'
import users from './initialUsers'


// loadingBarReducer is an npm package.
export default combineReducers({
  loggedIn,
  questions,
  users

})