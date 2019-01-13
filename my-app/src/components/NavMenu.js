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
            <NavLink to='/leader_board' exact>
            Leader Board
            </NavLink>
          </a>

          <a>
            <NavLink to='/new_question' exact activeClassName='active'>
            New Question
            </NavLink>
          </a>


        <a><strong>Current User: </strong> {this.props.activeUser['name']}</a>
        <button onClick={this.signOut}>Sign Out</button>

      </div>
    )
  }
}



export default connect((state) => ({
  activeUser: state.activeUser
}))(NavMenu)