import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { activeUser } from '../actions/activeUser'



class SignIn extends Component {

  state = {
    user_name: "false"
  }

  handleChange = (e) => {
    console.log("The e: " + e.target.value)
    let updated_value = e.target.value
    this.setState(() => ({
      user_name: updated_value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("The e value: " + this.state.user_name)
    this.props.dispatch(activeUser(this.state.user_name ))
  }

  render() {

  	if (this.props.activeUser) {
      return <Redirect to='/' />
    }
    console.log("user props: " + this.props.users)

    return (
      <div>
        <label for="user-select">Pick a user to sign in as:</label>

        <form onSubmit={this.handleSubmit} >
        <select id="user-select" onChange={this.handleChange}>
          <option value="" disabled selected>--Please choose an option--</option>

          {Object.keys(this.props.users).map((user) => (
            <option key={this.props.users[user]['id']} value={user} ref={(input) => this.textInput = input}>
              {user}
              {console.log('user key id: ' + this.props.users[user]['id'])}
            </option>
          ))}
          <option value="volvo">Volvo</option>

        </select>
        <button type="submit" disabled={this.state.user_name === 'false'}>Log In</button>

        </form>
      </div>
    )
  }
}



export default connect((state) => ({
  activeUser: state.activeUser,
  users: state.users
}))(SignIn)