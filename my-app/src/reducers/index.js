// combines all of our reducers to be used our root index.js file

import { combineReducers } from 'redux'
import activeUser from './activeUser'
import questions from './initialQuestions'
import users from './initialUsers'

export default combineReducers({
  activeUser,
  questions,
  users

})