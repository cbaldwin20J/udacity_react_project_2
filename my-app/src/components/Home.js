import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions/activeUser'



class Home extends Component {

  state = {
    show_answered: false,
    all_questions_ordered_by_date: [],
    already_answered_questions: []
  }

  componentDidMount(){
    if(this.props.activeUser.answers){
    let answered_questions = Object.keys(this.props.activeUser.answers)

    let question_ids = Object.keys(this.props.questions)
    let ordered_questions = question_ids.sort((q1, q2) => {
      return this.props.questions[q2].timestamp - this.props.questions[q1].timestamp
    })


    this.setState(() => ({
      already_answered_questions: answered_questions,
      all_questions_ordered_by_date: ordered_questions
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
      <div className="pageContainer">


        <button className="addSpace" disabled={ this.state.show_answered ? false: true } onClick={() => this.toggle_show_answered(false)}>Unanswered Questions</button>
        <button className="addSpace" disabled={ this.state.show_answered ? true: false } onClick={() => this.toggle_show_answered(true)}>Answered Questions</button>

        <h2 id="answeredOrNot">{this.state.show_answered ? 'Answered Questions' : 'Unanswered Questions'}</h2>
        {this.state.show_answered ?

        this.state.all_questions_ordered_by_date.filter(question => this.state.already_answered_questions.includes(question) === true).map((the_question) => (
          <div className="question_container" key={this.props.questions[the_question]['id']}>
          <img alt="users face" className="thumbnail" src={this.props.users[this.props.questions[the_question]['author']].avatarURL} />
          <p className="pollContainer"><strong >{this.props.users[this.props.questions[the_question].author].name} asks</strong>, would you rather...</p>

            <p>{this.props.questions[the_question]["optionOne"]["text"]}...</p>

            <p><button onClick={() => this.props.history.push('/questions/'+ this.props.questions[the_question]['id'])} >View Poll</button></p>


          <p></p>
          </div>
        ))
        :

        this.state.all_questions_ordered_by_date.filter(question => this.state.already_answered_questions.includes(question) === false).map((the_question) => (
          <div className="question_container" key={this.props.questions[the_question]['id']}>
          <img alt="users face" className="thumbnail" src={this.props.users[this.props.questions[the_question]['author']].avatarURL} />

          <p className="pollContainer"><strong>{this.props.users[this.props.questions[the_question].author].name} asks</strong>, would you rather...</p>

            <p>{this.props.questions[the_question]["optionOne"]["text"]}...</p>
            <p><button onClick={() => this.props.history.push('/questions/'+ this.props.questions[the_question]['id'])} >View Poll</button></p>


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