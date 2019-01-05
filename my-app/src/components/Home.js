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

  viewPoll = () => {

    this.props.history.push('/foo')

  }

  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }
    console.log("the answered state: " + this.state.answered_questions)
    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser['name']}</p>

        <button disabled={ this.state.answered_questions ? false: true } onClick={() => this.toggle_answered_questions(false)}>Unanswered Questions</button>
        <button disabled={ this.state.answered_questions ? true: false } onClick={() => this.toggle_answered_questions(true)}>Answered Questions</button>
        {Object.keys(this.props.questions).map((question) => (
          <div key={this.props.questions[question]['id']}>
          {this.props.questions[question].author} asks, would you rather...

            {this.props.questions[question]["optionOne"]["text"]}
            <button onClick={() => this.props.history.push('/questions/'+ this.props.questions[question]['id'])} >View Poll</button>


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