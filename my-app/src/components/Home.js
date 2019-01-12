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
    this.setState(() => ({
      already_answered_questions: answered_questions
    }))
    }
  }


  signOut = () => {
    this.props.dispatch(logOut())
  }

  toggle_show_answered = (answered) => {
    let is_answered = answered
    this.setState(() => ({
      show_answered: is_answered
    }))
  }



  render() {

    console.log("this component's state: " + JSON.stringify(this.state))
    return (
      <div>


        <button disabled={ this.state.show_answered ? false: true } onClick={() => this.toggle_show_answered(false)}>Unanswered Questions</button>
        <button disabled={ this.state.show_answered ? true: false } onClick={() => this.toggle_show_answered(true)}>Answered Questions</button>

        <h2>{this.state.show_answered ? 'Answered Questions' : 'Unanswered Questions'}</h2>
        {this.state.show_answered ?

        Object.keys(this.props.questions).filter(question => this.state.already_answered_questions.includes(question) === true).map((the_question) => (
          <div key={this.props.questions[the_question]['id']}>
          <img className="thumbnail" src={this.props.users[this.props.questions[the_question]['author']].avatarURL} />
          {this.props.questions[the_question].author} asks, would you rather...

            {this.props.questions[the_question]["optionOne"]["text"]}
            <button onClick={() => this.props.history.push('/questions/'+ this.props.questions[the_question]['id'])} >View Poll</button>


          <p></p>
          </div>
        ))
        :

        Object.keys(this.props.questions).filter(question => this.state.already_answered_questions.includes(question) === false).map((the_question) => (
          <div key={this.props.questions[the_question]['id']}>
          <img className="thumbnail" src={this.props.users[this.props.questions[the_question]['author']].avatarURL} />

          {this.props.questions[the_question].author} asksssss, would you rather...

            {this.props.questions[the_question]["optionOne"]["text"]}
            <button onClick={() => this.props.history.push('/questions/'+ this.props.questions[the_question]['id'])} >View Poll</button>


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
  questions: state.questions,
  users: state.users
}))(Home)