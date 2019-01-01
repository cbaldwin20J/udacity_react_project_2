import React, { Component } from 'react'
import { connect } from 'react-redux'


class QuestionDetail extends Component {

  render() {
    return (
      <div>
        The question detail component
      </div>
    )
  }
}



export default connect()(QuestionDetail)