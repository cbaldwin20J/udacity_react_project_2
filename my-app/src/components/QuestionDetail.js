import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'




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
    this.setState(() => ({
      question_object: questionObject[0]
    }))
  }

  handleOptionChange = (e) => {
    let option_change = e.target.value
    this.setState({
    selectedOption: option_change
  });
}

  signOut = () => {
    this.props.dispatch(logOut())
  }

  render() {

  	if (!this.props.activeUser) {
      return <Redirect to='/sign_in' />
    }

    console.log("the params: " + this.props.match.params.question_id)
    console.log("question_object state: " + JSON.stringify(this.state.question_object))
    console.log("selectedOption state: " + this.state.selectedOption)

    return (
      <div>
        <p><button onClick={this.signOut}>Sign Out</button></p>
        <p><strong>Current User: </strong> {this.props.activeUser['name']}</p>
        <p></p>
        <div onChange={this.handleChange}>
          <input type="radio" name="the_answer" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange}/>{this.state.question_object && this.state.question_object["optionOne"]["text"]}
          <input type="radio" name="the_answer" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange}/>{this.state.question_object && this.state.question_object["optionTwo"]["text"]}
        </div>
        <button>Save</button>






      </div>
    )
  }
}



export default connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions
}))(QuestionDetail)