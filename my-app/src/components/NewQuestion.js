// the create a new question page

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {saveQuestion} from '../actions/saveQuestion'


class NewQuestion extends Component {

  state = {
    // the optionOne input text
    option_one: '',
    // the optionTwo input text
    option_two: ''
  }

  option_update = (e, whichOption) => {
  	let optionValue = e.target.value

  	this.setState((currentState) => ({
      ...currentState,
      [whichOption]: optionValue
    }))
  }

  saveQuestion = () => {

    const question = {
  		optionOneText: this.state.option_one,
  		optionTwoText: this.state.option_two,
  		author: this.props.activeUser.id
  	}

  	this.props.dispatch(saveQuestion(question))
  	  .then(() => {
        // redirect to the home page after question has been saved
  	    this.props.history.push('/')
    })
  }


  render() {

    return (
      <div id="newQuestionContainer">

        <p></p>
      	<h1 className="titleContainer">Complete the question...</h1>
      	<p></p>

        <h2 className="h2Container">Would you rather...</h2>

        <label htmlFor="op_1">Option 1: </label>
      	<input id="op_1" type="text" value={this.state.option_one} onChange={(e) => this.option_update(e, "option_one")}/>
      	<p></p>
      	<p><strong>OR...</strong></p>
      	<p></p>
      	<label htmlFor="op_2">Option 2: </label>
      	<input id="op_2" type="text" value={this.state.option_two} onChange={(e) => this.option_update(e, "option_two")}/>
      	<p></p>

        <button type="submit" disabled={this.state.option_one == "" || this.state.option_two == ""} onClick={this.saveQuestion}>Save</button>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions,
  users: state.users
}))(NewQuestion))


