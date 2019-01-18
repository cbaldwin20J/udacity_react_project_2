// the navigation bar at the top of our app

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink, withRouter } from 'react-router-dom'
import { logOut } from '../actions/activeUser'


class NavMenu extends Component {

  signOut = () => {
    this.props.dispatch(logOut())
  }

  render() {

  	console.log("this.props.location.pathname" + JSON.stringify(this.props.location.pathname))

    // if the user is not logged in
    if (!this.props.activeUser) {
      // then take them to the sign in page if not already on it
      if(this.props.location.pathname != '/sign_in'){
        // when sending them to the sign in page, leave a trace of what page the user
        // originally wanted to go to, so once they sign in the site will take them
        // to that page.
        return <Redirect to={{
          pathname: '/sign_in',
          state: { from: this.props.location }}}/>
        }
    }

    return (
      <div className='topnav'>

            <NavLink to='/' exact activeClassName='active'>
            Home
            </NavLink>

            <NavLink to='/leaderboard' exact>
            Leader Board
            </NavLink>

            <NavLink to='/add' exact activeClassName='active'>
            New Question
            </NavLink>

            {this.props.activeUser &&
            <NavLink to='#' activeClassName='active'>
            <strong>Current User: </strong> {this.props.activeUser['name']}
            </NavLink>
            }

            <button id="buttonFloat" onClick={this.signOut}>Sign Out</button>

      </div>
    )
  }
}


export default withRouter(connect((state) => ({
  activeUser: state.activeUser
}))(NavMenu))
