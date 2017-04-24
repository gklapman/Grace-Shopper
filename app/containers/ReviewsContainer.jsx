
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { postReview } from '../reducers/meme'
import Reviewcreator from '../components/reviewcreator'

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

    postReview({
      title: this.state.title,
      content: this.state.content,
      stars: this.state.stars,
      meme_id: this.props.selectedMeme.id,
      user_id: this.props.currentUser.id
    })
  }
  handleChange(event) {
    console.log(event.currentTarget.value)
    event.preventDefault()
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }

  render(state) {
    let userSet = false;

    console.log('currnet user', this.props.currentUser)
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
           <div style={{border: '2px solid black', margin: '0 0 100px 0'}}>
      <form onSubmit = {this.handleSubmit}>
        <label className="labelform" style={{display: 'block', margin:'20px'}} type="text" htmlFor="title">Write tile here for meme review.</label>
        <input name='title' style={{width: '300px', display:'block', margin:'20px'}} type="text" value={this.state.title} onChange={this.handleChange} id="title" placeholder="title"></input>
        <label htmlFor="content" style={{display: 'block', margin:'20px'}}  >Write review here for meme.</label>

        <textarea name='content' value={this.state.content} onChange={this.handleChange} style={{display: 'block',  margin:'20px', width: '400px'}} id="content"  rows="7" ></textarea>

          <select value={this.state.value} onChange={this.handleChange} className="ratingControl" name='stars' id="exampleSelect1" style={{ margin:'20px'}}>
            <option selected disabled hidden style={{display: 'none'}} value=''></option>
            <option value ='1' >★</option>
            <option value ='2' >★★</option>
            <option value ='3' >★★★</option>
            <option value ='4' >★★★★</option>
            <option value ='5' >★★★★★</option>
          </select>
            <input type="submit" value="Submit" disabled={!userSet}/>
      </form>
    </div>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer)

