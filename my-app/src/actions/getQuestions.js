import { _getQuestions } from '../utils/_DATA'


export function handleInitialData () {
  return (dispatch) => {

    return _getQuestions()
      .then((questions) => {
        // puts the users in the state
        dispatch(receiveUsers(users))
        // puts the tweets in the state
        dispatch(receiveTweets(tweets))
        // sets the authedUser in the state
        dispatch(setAuthedUser(AUTHED_ID))
        // now that we set our state, we can hide our loading bar

      })
  }
}