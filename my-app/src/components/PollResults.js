import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'




class PollResults extends Component {

  state = {
    option_one_length: null,
    option_two_length: null,
    optionOnePercent: null,
    optionTwoPercent: null,
    question_object: null,
    activeUserAnswer: null
  }

  componentDidMount() {

    const questionsArray = Object.values(this.props.questions)
    console.log("questionArray: " + questionsArray)

    const questionObject = questionsArray.filter(q => q.id == this.props.match.params.question_id)
    console.log("questionObject: " + JSON.stringify(questionObject[0]))


    if (!questionObject[0]){
      this.props.history.push('/404')
    }
    const optionOneLength = questionObject[0].optionOne.votes.length
    const optionTwoLength = questionObject[0].optionTwo.votes.length

    const optionOnePercentage = optionOneLength / (optionOneLength + optionTwoLength)
    const optionTwoPercentage = optionTwoLength / (optionOneLength + optionTwoLength)

    const active_user_answer = this.props.activeUser.answers[questionObject[0].id]


    this.setState(() => ({
      option_one_length: optionOneLength,
      option_two_length: optionTwoLength,
      optionOnePercent: optionOnePercentage,
      optionTwoPercent: optionTwoPercentage,
      question_object: questionObject[0],
      activeUserAnswer: active_user_answer
    }))
  }



  render() {
      console.log("the pollResults state: " + JSON.stringify(this.state))

    return (
      <div className="pageContainer question_container">

        {this.state.question_object ?
        <div>
          <p></p>
          <img alt="users face" className="thumbnail" src={this.props.users[this.state.question_object.author]['avatarURL']} />
          <h3>Asked by {this.props.users[this.state.question_object.author].name}</h3>
          <h2>Results....</h2>

          <div className="pollContainer">
          <p className="optionPollText">{this.state.question_object.optionOne.text}</p>
          <p> {this.state.option_one_length} out of {this.state.option_one_length + this.state.option_two_length}: <strong>{((this.state.option_one_length /(this.state.option_one_length + this.state.option_two_length)) * 100).toFixed(2)} %</strong> </p>
          {this.state.activeUserAnswer == "optionOne" && <p><span className="star">&#9734;</span> You answered option one</p>}
          <p></p>
          <p></p>
          </div>
          <div className="pollContainer">
          <p className="optionPollText">{this.state.question_object && this.state.question_object.optionTwo.text}</p>
          <p> {this.state.option_two_length} out of {this.state.option_one_length + this.state.option_two_length}: <strong>{((this.state.option_two_length /(this.state.option_one_length + this.state.option_two_length)) * 100).toFixed(2)} %</strong>  </p>
          {this.state.activeUserAnswer == "optionTwo" && <p><span className="star">&#9734;</span> You answered option two</p>}
          </div>
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
