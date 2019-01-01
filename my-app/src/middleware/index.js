import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

// thunk allows us to make api calls in the action creators
export default applyMiddleware(
  thunk,
  logger,
)