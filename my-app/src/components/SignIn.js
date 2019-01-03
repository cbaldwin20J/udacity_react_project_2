import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



class SignIn extends Component {

  render() {

  	if (this.props.loggedIn) {
      return <Redirect to='/' />
    }
    console.log("user props: " + this.props.users)

    return (
      <div>
        <h1>Pick a user to sign in as</h1>
        <select name="userSignIn" >

          {Object.keys(this.props.users).map((user) => (
            <option key={this.props.users[user]['id']}>
              {user}
              {console.log('user key id: ' + this.props.users[user]['id'])}
            </option>
          ))}
          <option value="volvo">Volvo</option>

        </select>
      </div>
    )
  }
}



export default connect((state) => ({
  loggedIn: state.loggedIn,
  users: state.users
}))(SignIn)