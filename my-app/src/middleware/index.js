// combines all of our middleware to be used in the root index.js

import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

// thunk allows us to make api calls in the action creators
// logger will console.log our store's state whenever it changes
export default applyMiddleware(
  thunk,
  logger,
)