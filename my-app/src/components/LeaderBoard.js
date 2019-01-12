import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'



class LeaderBoard extends Component {

  render() {

    return (
      <div>
        {Object.keys(this.props.users).map((the_user) => (
          <div key={this.props.users[the_user]['id']}>
            <p></p>
            <img className="thumbnail" alt="person image"src={this.props.users[the_user]['avatarURL']} />
            <p>{this.props.users[the_user]['name']}</p>
            <p>Answered Questions: {Object.keys(this.props.users[the_user]['answers']).length}</p>
            <p>Created Questions: {this.props.users[the_user]['questions'].length}</p>
            <p>Score: {(Object.keys(this.props.users[the_user]['answers']).length) + (this.props.users[the_user]['questions'].length)}</p>
          <p></p>
          </div>
        ))}





      </div>
    )
  }
}


export default connect((state) => ({
  activeUser: state.activeUser,
  users: state.users
}))(LeaderBoard)


