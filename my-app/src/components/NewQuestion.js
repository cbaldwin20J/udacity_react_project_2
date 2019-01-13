// need to make it like this...
// import _saveQuestion from _DATA.js
// question = {author: "whatevername", optionTwoText: "whatever", optionOneText: "whatever"}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import {saveQuestion} from '../actions/saveQuestion'



class NewQuestion extends Component {

  state = {
    option_one: '',
    option_two: ''
  }


  option_1 = (e) => {
  	let option1 = e.target.value
  	this.setState((currentState) => ({
      ...currentState,
      option_one: option1
    }))
  }

  option_2 = (e) => {
  	let option2 = e.target.value
  	this.setState((currentState) => ({
      ...currentState,
      option_two: option2
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
  	this.props.history.push('/')
  })

  }



  render() {


    return (
      <div>
      	<p></p>
      	<p>Complete the question...</p>
      	<p></p>
      	<p>Would you rather...</p>
      	<label for="op_1">Option 1: </label>
      	<input id="op_1" type="text" value={this.state.option_one} onChange={this.option_1}/>
      	<p></p>
      	<p>OR...</p>
      	<p></p>
      	<label for="op_2">Option 2: </label>
      	<input id="op_2" type="text" value={this.state.option_two} onChange={this.option_2}/>
      	<p></p>
      	<button type="submit" onClick={this.saveQuestion}>Save</button>
      </div>
    )
  }

}


export default withRouter(connect((state) => ({
  activeUser: state.activeUser,
  questions:state.questions,
  users: state.users
}))(NewQuestion))


