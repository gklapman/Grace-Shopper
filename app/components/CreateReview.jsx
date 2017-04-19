import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';


class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      stars: ''

    };

    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);

    submit(){
      conosle.log(submit)
    }


    change(event){
      event.preventDefault()

    }




    render(){
      return (
        <div class="form-group">
          <input type="text" class="form-control" id="title" placeholder="title">
          <small id="title" class="form-text text-muted">We'll never share your email with anyone else.</small>
          <label for="content">Write review here for meme.</label>
          <textarea class="form-control" id="content" rows="3"></textarea>
          <label for="ratingControl">Star Rating Quantity</label>
          <select class="ratingControl" id="exampleSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

        </div>
      )
    }


    export default connect(mapStateToProps)(CreateReview)
}

