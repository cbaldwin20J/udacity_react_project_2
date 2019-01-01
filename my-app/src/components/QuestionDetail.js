import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



class QuestionDetail extends Component {

  render() {

  	if (!this.props.loggedIn) {
      return <Redirect to='/sign_in' />
    }

    return (
      <div>
        The question detail component
      </div>
    )
  }
}



export default connect((state) => ({
  loggedIn: state.loggedIn
}))(QuestionDetail)