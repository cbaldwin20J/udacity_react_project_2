// the main container of our app
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// the components
import SignIn from './SignIn'
import QuestionDetail from './QuestionDetail'
import PollResults from './PollResults'
import LeaderBoard from './LeaderBoard'
import NavMenu from './NavMenu'
import Home from './Home'
import NewQuestion from './NewQuestion'
import FourOFour from './404'
// end of the components

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

          <NavMenu />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/sign_in' exact component={SignIn} />
            <Route path='/questions/:question_id' component={QuestionDetail} />
            <Route path='/poll_results/:question_id' component={PollResults} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route path='/add' component={NewQuestion} />
            <Route component={FourOFour} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App)


