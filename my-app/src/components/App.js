import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import SignIn from './SignIn'
import QuestionDetail from './QuestionDetail'
import Home from './Home'



class App extends Component {
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

export default App;

//*****************************************************************//

