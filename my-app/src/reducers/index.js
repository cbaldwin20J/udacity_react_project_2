import { combineReducers } from 'redux'
import activeUser from './activeUser'
import questions from './initialQuestions'
import users from './initialUsers'


// loadingBarReducer is an npm package.
export default combineReducers({
  activeUser,
  questions,
  users

})