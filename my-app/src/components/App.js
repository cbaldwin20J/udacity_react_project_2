import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'
import SignIn from './SignIn'
import QuestionDetail from './QuestionDetail'
import Home from './Home'
import { handleInitialQuestions, handleInitialUsers } from '../actions/initialData'




class App extends Component {

  componentDidMount() {
    // gets data from database and sets up our state.
    this.props.dispatch(handleInitialQuestions())
    this.props.dispatch(handleInitialUsers())
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/sign_in' exact component={SignIn} />
          <Route path='/questions/:question_id' component={QuestionDetail} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App)


