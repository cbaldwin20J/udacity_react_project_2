import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'



class Home extends Component {

  state = {
    show_answered: false,
    already_answered_questions: []
  }

  componentDidMount(){
    if(this.props.activeUser.answers){
    let answered_questions = Object.keys(this.props.activeUser.answers)
    console.log('answered_questions: ' + answered_questions)
    this.setState(() => ({
      already_answered_questions: answered_questions
    }))
    }
  }


  signOut = () => {
    this.props.dispatch(logOut())
  }

  toggle_show_answered = (answered) => {
    this.setState(() => ({
      show_answered: answered
    }))
  }

  viewPoll = () => {

    this.props.history.push('/foo')

  }

  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }
    console.log("state already answered: " + this.state.already_answered_questions );
    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser['name']}</p>

        <button disabled={ this.state.show_answered ? false: true } onClick={() => this.toggle_show_answered(false)}>Unanswered Questions</button>
        <button disabled={ this.state.show_answered ? true: false } onClick={() => this.toggle_show_answered(true)}>Answered Questions</button>

        <h2>{this.state.show_answered ? 'Answered Questions' : 'Unanswered Questions'}</h2>
        {this.state.show_answered ?

        Object.keys(this.props.questions).filter(question => this.state.already_answered_questions.includes(question)).map((question) => (
          <div key={this.props.questions[question]['id']}>
          {this.props.questions[question].author} asks, would you rather...

            {this.props.questions[question]["optionOne"]["text"]}
            <button onClick={() => this.props.history.push('/questions/'+ this.props.questions[question]['id'])} >View Poll</button>


          <p></p>
          </div>
        ))
        :

        Object.keys(this.props.questions).filter(question => !this.state.already_answered_questions.includes(question)).map((question) => (
          <div key={this.props.questions[question]['id']}>
          {this.props.questions[question].author} asks, would you rather...

            {this.props.questions[question]["optionOne"]["text"]}
            <button onClick={() => this.props.history.push('/questions/'+ this.props.questions[question]['id'])} >View Poll</button>


          <p></p>
          </div>
        ))

        }









      </div>
    )
  }
}


export default connect((state) => ({
  activeUser: state.activeUser,
  questions: state.questions
}))(Home)