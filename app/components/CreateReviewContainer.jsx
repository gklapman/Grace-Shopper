import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { postReview } from '../reducers/meme'


class CreateReview extends Component {
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

    this.props.postReview({
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
    return (
      <div style={{border: '2px solid black', margin: '0 0 100px 0'}}>

        <form onSubmit = {this.handleSubmit}>
          <label className="labelform" style={{display: 'block', margin:'20px'}} type="text" htmlFor="title">Write tile here for meme review.</label>
          <input name='title' style={{width: '300px', display:'block', margin:'20px'}} type="text" value={this.state.title} onChange={this.handleChange} id="title" placeholder="title"></input>
          <label htmlFor="content" style={{display: 'block', margin:'20px'}}  >Write review here for meme.</label>

          <textarea name='content' value={this.state.content} onChange={this.handleChange} style={{display: 'block',  margin:'20px', width: '400px'}} id="content"  rows="7"></textarea>

            <select value={this.state.value} onChange={this.handleChange} className="ratingControl" name='stars' id="exampleSelect1" style={{ margin:'20px'}}>
              <option selected disabled hidden style={{display: 'none'}} value=''></option>
              <option value ='1' >★</option>
              <option value ='2' >★★</option>
              <option value ='3' >★★★</option>
              <option value ='4' >★★★★</option>
              <option value ='5' >★★★★★</option>
            </select>
              <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    selectedMeme: state.meme.selectedMeme
  }
}

const mapDispatchToProsp = { postReview }

export default connect(mapStateToProps, mapDispatchToProsp)(CreateReview)

