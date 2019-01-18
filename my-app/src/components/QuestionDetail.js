// the page to answer a poll

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { activeUser } from '../actions/activeUser'
import { saveAnswer } from '../actions/saveQuestionAnswer'


class QuestionDetail extends Component {

  state = {
    // the question object for this page
    question_object: null,
    // if the user has already answered this question before
    // then selectedOption will prefill the previous answer
    selectedOption: null
  }

  componentDidMount() {
    // array of all question ids
    const questionsArray = Object.values(this.props.questions)
    // finding the question in the array that matches what was sent in the url
    const questionObject = questionsArray.filter(q => q.id == this.props.match.params.question_id)

    let if_pre_answered = null
    if(questionObject[0]){
      if(questionObject[0].optionOne.votes.includes(this.props.activeUser.id)){
        if_pre_answered = "optionOne"
      }else if(questionObject[0].optionTwo.votes.includes(this.props.activeUser.id)){
        if_pre_answered = "optionTwo"
      }
    }

    // if the questionObject doesn't exist then throw the 404 page


    this.setState(() => ({
      question_object: questionObject[0],
      selectedOption: if_pre_answered,
    }))

  }

  // will record which option the user currently has selected
  handleOptionChange = (e) => {
    let option_change = e.target.value

    this.setState({
      selectedOption: option_change
    });

  }

  // will save whatever answer the user has chosen when the save button
  // is clicked
  saveAnswer = () => {
    let users_answer = this.state.selectedOption
    let question_id = this.state.question_object.id
    let user_id = this.props.activeUser.id

    this.props.dispatch(saveAnswer(user_id, question_id, users_answer ))
    .then(() => {
      // an array of all the user ids
      let values = Object.values(this.props.users)
      // getting the user object from the array that matches the activeUser.id
      let value = values.filter(v => v.id == this.props.activeUser.id)
      // resaving our 'activeUser' in the store's state to hold the updated info
      // this is important for the home page 'answered/unanswered' buttons
      this.props.dispatch(activeUser(value[0] ))
    })
    .then(() => {
      // once the answer is saved the go to the poll results page for this
      // question object
      this.props.history.push('/poll_results/'+ this.props.match.params.question_id)
    })
  }


  render() {

    return (
      <div className="pageContainer question_container">
      {this.state.question_object ?
        <div>
        <p></p>

        {this.state.question_object &&
          <div>
            <img alt="users face" className="thumbnail" src={this.props.users[this.state.question_object.author]['avatarURL']} />
            <p className="pollContainer"><strong >{this.props.users[this.state.question_object.author]['name']} asks,</strong> would you rather...</p>
          </div>
        }

        <div className="giveMargin" onChange={this.handleChange}>
          <span className="questionInputs"> <input type="radio" name="the_answer" value="optionOne" checked={this.state.selectedOption === 'optionOne'} onChange={this.handleOptionChange}/>{this.state.question_object && this.state.question_object["optionOne"]["text"]}</span>
          <span className="questionInputs"><input className="optionPollText" type="radio" name="the_answer" value="optionTwo" checked={this.state.selectedOption === 'optionTwo'} onChange={this.handleOptionChange}/>{this.state.question_object && this.state.question_object["optionTwo"]["text"]}</span>
        </div>

        <p></p>
        <button onClick={this.saveAnswer} disabled={!this.state.selectedOption} >Save</button>
        <p></p>
        </div>
        :
          <div className="pageContainer">
            <h1>404: poll not found</h1>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions,
  users: state.users
}))(QuestionDetail))


