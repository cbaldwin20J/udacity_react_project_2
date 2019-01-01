import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



class SignIn extends Component {

  render() {

  	if (this.props.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div>
        The sign in component
      </div>
    )
  }
}



export default connect((state) => ({
  loggedIn: state.loggedIn
}))(SignIn)