import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'




class QuestionDetail extends Component {

  signOut = () => {
    this.props.dispatch(logOut())
  }

  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }

    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser}</p>
        The question detail component
      </div>
    )
  }
}



export default connect((state) => ({
  activeUser: state.activeUser
}))(QuestionDetail)