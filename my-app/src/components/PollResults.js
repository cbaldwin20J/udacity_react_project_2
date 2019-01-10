import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, Switch } from 'react-router-dom'
import { logOut, activeUser } from '../actions/activeUser'
import { saveAnswer } from '../actions/saveQuestionAnswer'




class PollResults extends Component {

  state = {
    optionOnePercent: null,
    optionTwoPercent: null,
    question_object: null
  }

  componentDidMount() {

    const questionsArray = Object.values(this.props.questions)
    console.log("questionArray: " + questionsArray)

    const questionObject = questionsArray.filter(q => q.id == this.props.match.params.question_id)
    console.log("questionObject: " + JSON.stringify(questionObject[0]))

    const optionOneLength = questionObject[0].optionOne.votes.length
    const optionTwoLength = questionObject[0].optionTwo.votes.length

    const optionOnePercentage = optionOneLength / (optionOneLength + optionTwoLength)
    const optionTwoPercentage = optionTwoLength / (optionOneLength + optionTwoLength)

    this.setState(() => ({
      optionOnePercent: optionOnePercentage,
      optionTwoPercent: optionTwoPercentage,
      question_object: questionObject[0]
    }))
  }


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
        <p><strong>Current User: </strong> {this.props.activeUser['name']}</p>
        <p></p>

        <div>
          <h2>Results....</h2>
          <p>1 {this.state.question_object && this.state.question_object.optionOne.text}</p>
          <p>2 {this.state.question_object && this.state.question_object.optionTwo.text}</p>
        </div>


      </div>
    )
  }
}



export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions
}))(PollResults))