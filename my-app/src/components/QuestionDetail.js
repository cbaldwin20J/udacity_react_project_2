import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { activeUser } from '../actions/activeUser'
import { saveAnswer } from '../actions/saveQuestionAnswer'




class QuestionDetail extends Component {

  state = {
    question_object: null,
    selectedOption: null

  }

  componentDidMount() {

    const questionsArray = Object.values(this.props.questions)
    console.log("questionArray: " + questionsArray)
    const questionObject = questionsArray.filter(q => q.id == this.props.match.params.question_id)
    console.log("questionObject: " + JSON.stringify(questionObject[0]))

    let if_pre_answered = null
    if(questionObject[0].optionOne.votes.includes(this.props.activeUser.id)){
      if_pre_answered = "optionOne"
    }else if(questionObject[0].optionTwo.votes.includes(this.props.activeUser.id)){
      if_pre_answered = "optionTwo"
    }

    if (!questionObject[0]){
      this.props.history.push('/404')
    }

    this.setState(() => ({
      question_object: questionObject[0],
      selectedOption: if_pre_answered,
    }))
  }

  handleOptionChange = (e) => {
    let option_change = e.target.value
    this.setState({
    selectedOption: option_change
  });
}





  saveAnswer = () => {
    let users_answer = this.state.selectedOption
    let question_id = this.state.question_object.id
    let user_id = this.props.activeUser.id
    this.props.dispatch(saveAnswer(user_id, question_id, users_answer ))
    .then(() => {
      let values = Object.values(this.props.users)
      let value = values.filter(v => v.id == this.props.activeUser.id)
      console.log("alskdjfalkdsjfalsdkfj: " + value[0])
      this.props.dispatch(activeUser(value[0] ))
  })
    .then(() => {

      this.props.history.push('/poll_results/'+ this.props.match.params.question_id)

    })

  }



  render() {



    console.log("the params: " + this.props.match.params.question_id)
    console.log("question_object state: " + JSON.stringify(this.state.question_object))
    console.log("selectedOption state: " + this.state.selectedOption)

    return (
      <div className="pageContainer question_container">

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
    )
  }
}



export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions,
  users: state.users
}))(QuestionDetail))


//
// to save an updated answer you need the question id, and an 'answers' array
// on the user using x = 'Object.keys(user.answers)'

// if the question id is in the 'x' then you need to do users[user].answers[question_id] = new_answer ('optionOne'/'optionTwo')
// then go to the questions[question]optionOne and questions[question].optionTwo, clear both