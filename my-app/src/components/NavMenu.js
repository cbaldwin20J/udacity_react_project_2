import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { logOut } from '../actions/activeUser'



class NavMenu extends Component {

  signOut = () => {
    this.props.dispatch(logOut())
  }


  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }

    return (
      <div className='topnav'>

          <a>
            <NavLink to='/' exact activeClassName='active'>
            Home
            </NavLink>
          </a>

          <a>
            <NavLink to='/leaderboard' exact>
            Leader Board
            </NavLink>
          </a>

          <a>
            <NavLink to='/add' exact activeClassName='active'>
            New Question
            </NavLink>
          </a>

          <a>
            <NavLink to='#' activeClassName='active'>
            <strong>Current User: </strong> {this.props.activeUser['name']}
            </NavLink>
          </a>



        <button id="buttonFloat" onClick={this.signOut}>Sign Out</button>

      </div>
    )
  }
}



export default connect((state) => ({
  activeUser: state.activeUser
}))(NavMenu)