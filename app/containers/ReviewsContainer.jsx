import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getReviews } from '../reducers/meme'
import ReviewCreator from '../components/reviewcreator'

import Reviews from '../components/Reviews.jsx'

class ReviewsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      stars: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    let rev = {
      title: this.state.title,
      content: this.state.content,
      stars: this.state.stars,
      meme_id: this.props.selectedMeme.id,
      user_id: this.props.currentUser.id
    }

    axios.post('/api/reviews', rev)
    .then(res => {
      return this.props.reloadReviews(this.props.selectedMeme.id)
    })

    this.setState({
      title: '',
      content: '',
      stars: 0
    })

  }
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }

  render(state) {
    let userSet = false;

    if (this.props.currentUser !== '') {
      userSet = true
    }

    // if (this.props.currentUser !== undefined) { userSet = true }
    // else {userSet = false }
    // console.log('currnet user', userSet)

    return (
      <div>
        <div>
          <Reviews review={this.props.reviews} />
        </div>
        {userSet ? <ReviewCreator handleChange={this.handleChange} handleSubmit={this.handleSubmit} title={this.state.title} content={this.state.content} stars={this.state.stars}/> : <div>Log in to leave a review!</div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    selectedMeme: state.meme.selectedMeme,
    reviews: state.meme.reviews,
  }
}


const mapDispatchToProps = function(dispatch) {
  return {
    onSubmit: function(obj) {
      dispatch(postReview(obj))
    },
    reloadReviews: (meme) => {dispatch(getReviews(meme))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer)

