export const ACTIVATE_USER = "ACTIVATE_USER"
export const LOG_OUT = "LOG_OUT"

// this is to set the loggin in user into the store's state
export function activeUser(userName){
  return {
    type: ACTIVATE_USER,
    active_user: userName,
  }
}

// ends the session
export function logOut(){
	return {
		type: LOG_OUT
	}
}