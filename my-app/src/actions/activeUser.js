export const ACTIVATE_USER = "ACTIVATE_USER"

export function activeUser(userName){
  return {
    type: ACTIVATE_USER,
    active_user: userName,
  }
}