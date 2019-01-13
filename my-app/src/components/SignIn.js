// the app's sign in page

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { activeUser } from '../actions/activeUser'
import { users } from '../utils/_DATA'


class SignIn extends Component {

  state = {
    // which user name the select menu is currently set on
    user_name: ""
  }

  // sets whatever user name the select menu is currently set on
  handleChange = (e) => {
    console.log("The e: " + e.target.value)
    let updated_value = e.target.value
    this.setState(() => ({
      user_name: updated_value
    }))
  }

  // when the user clicks the sign in button
  handleSubmit = (e) => {
    e.preventDefault()
    // creates an array of all user ids
    let values = Object.values(this.props.users)
    // gets the user object from the array that matches the one
    // the user signed in as
    let value = values.filter(v => v.id == this.state.user_name)
    // sets our 'activeUser' in the store's state
    this.props.dispatch(activeUser(value[0] ))
  }

  render() {

  	if (this.props.activeUser) {
      return <Redirect to='/' />
    }

    return (

      <div id="signInContainer">

        {Object.keys(this.props.users).length == Object.keys(users).length?
          <div>
            <p id="pickAUser"><label htmlFor="user-select">Pick a user to sign in as:</label></p>

            <form onSubmit={this.handleSubmit} >
              <select id="user-select" onChange={this.handleChange} value={this.state.user_name}>
                <option value="" disabled >--Please choose an option--</option>

                {Object.keys(this.props.users).map((user) => (

                  <option key={this.props.users[user]['id']} value={this.props.users[user]['id']} >
                    {this.props.users[user]['name']}
                    {console.log('user key id: ' + this.props.users[user]['id'])}
                  </option>

                ))}

              </select>

              <button id="signInButton" type="submit" disabled={this.state.user_name === ''}>Log In</button>
            </form>
          </div>

        :

          <h1>Loading...</h1>

        }

      </div>
    )
  }
}

export default connect((state) => ({
  activeUser: state.activeUser,
  users: state.users
}))(SignIn)