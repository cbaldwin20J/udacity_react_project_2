import React, { Component } from 'react'
import { connect } from 'react-redux'


class SignIn extends Component {

  render() {
    return (
      <div>
        The sign in component
      </div>
    )
  }
}



export default connect()(SignIn)