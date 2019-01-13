import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../actions/activeUser'



class LeaderBoard extends Component {

  state = {
    user_ids_in_score_order: null
  }

  componentDidMount() {
    let the_users = Object.keys(this.props.users)
    console.log("*******the_users: " + the_users)

    let users_final = the_users.sort((user_1, user_2) => {
      let user_1_answers_length = Object.keys(this.props.users[user_1].answers).length
      let user_1_questions_length = this.props.users[user_1].questions.length
      let user_ones_total = user_1_questions_length + user_1_answers_length

      let user_2_answers_length = Object.keys(this.props.users[user_2].answers).length
      let user_2_questions_length = this.props.users[user_2].questions.length
      let user_twos_total = user_1_questions_length + user_2_answers_length

      return user_twos_total - user_ones_total

    })

    console.log("users_final: " + users_final)

    this.setState(() => ({
      user_ids_in_score_order: users_final
    }))





  }

  render() {

    return (
      <div>

        {this.state.user_ids_in_score_order &&
          this.state.user_ids_in_score_order.map((the_user) => (
          <div key={this.props.users[the_user]['id']}>
            <p></p>
            <img className="thumbnail" alt="person image"src={this.props.users[the_user]['avatarURL']} />
            <p>{this.props.users[the_user]['name']}</p>
            <p>Answered Questions: {Object.keys(this.props.users[the_user]['answers']).length}</p>
            <p>Created Questions: {this.props.users[the_user]['questions'].length}</p>
            <p>Score: {(Object.keys(this.props.users[the_user]['answers']).length) + (this.props.users[the_user]['questions'].length)}</p>
          <p></p>
          </div>
        ))
        }





      </div>
    )
  }
}


export default connect((state) => ({
  activeUser: state.activeUser,
  users: state.users
}))(LeaderBoard)


