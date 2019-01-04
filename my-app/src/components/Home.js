import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'



class Home extends Component {

  state = {
    answered_questions: false
  }

  signOut = () => {
    this.props.dispatch(logOut())
  }

  toggle_answered_questions = (answered) => {
    console.log("answered parameter: " + answered)

    this.setState(() => ({
      answered_questions: answered
    }))
  }

  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }
    console.log("the answered state: " + this.state.answered_questions)
    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser}</p>
        <button onClick={() => this.toggle_answered_questions(false)}>Unanswered Questions</button>
        <button onClick={() => this.toggle_answered_questions(true)}>Answered Questions</button>
        {Object.keys(this.props.questions).map((question) => (
          <div>
          {this.props.questions[question].author} asks:
          <form>
            <input type="radio"/> {this.props.questions[question]["optionOne"]["text"]}
            <input type="radio"/> {this.props.questions[question]["optionTwo"]["text"]}
          </form>
          <p></p>
          </div>
        ))}
      </div>
    )
  }
}


export default connect((state) => ({
  activeUser: state.activeUser,
  questions: state.questions
}))(Home)