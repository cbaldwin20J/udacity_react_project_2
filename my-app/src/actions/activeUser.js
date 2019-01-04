export const ACTIVATE_USER = "ACTIVATE_USER"
export const LOG_OUT = "LOG_OUT"


export function activeUser(userName){
  return {
    type: ACTIVATE_USER,
    active_user: userName,
  }
}

export function logOut(){
	return {
		type: LOG_OUT
	}
}