import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, Switch } from 'react-router-dom'
import { logOut, activeUser } from '../actions/activeUser'
import { saveAnswer } from '../actions/saveQuestionAnswer'




class PollResults extends Component {

  state = {
    option_one_length: null,
    option_two_length: null,
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
      option_one_length: optionOneLength,
      option_two_length: optionTwoLength,
      optionOnePercent: optionOnePercentage,
      optionTwoPercent: optionTwoPercentage,
      question_object: questionObject[0]
    }))
  }


  signOut = () => {
    this.props.dispatch(logOut())
  }

  render() {
      console.log("the pollResults state: " + JSON.stringify(this.state))
  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }

    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser['name']}</p>
        <p></p>

        {this.state.question_object ?
        <div>
          <h3>Added by {this.props.users[this.state.question_object.author].name}</h3>
          <h2>Results....</h2>

          <p>{this.state.question_object.optionOne.text}</p>
          <p> {this.state.option_one_length} out of {this.state.option_one_length + this.state.option_two_length}: {((this.state.option_one_length /(this.state.option_one_length + this.state.option_two_length)) * 100).toFixed(2)} % </p>
          <p></p>
          <p></p>
          <p>{this.state.question_object && this.state.question_object.optionTwo.text}</p>
          <p> {this.state.option_two_length} out of {this.state.option_one_length + this.state.option_two_length}: {((this.state.option_two_length /(this.state.option_one_length + this.state.option_two_length)) * 100).toFixed(2)} %  </p>
        </div>
          :
        <div>
          <p>...</p>
        </div>
        }


      </div>
    )
  }
}



export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions,
  users:state.users
}))(PollResults))
