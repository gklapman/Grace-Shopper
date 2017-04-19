import React from 'react'
import { Link } from 'react-router'


const Reviews = ({review}) => {
  return (
    <div>
      props.reviews.map( (review,index) => {(
          <div key={review.index}>
            <h3>{review.title}</h3>
            <h4>`${review.stars} review`</h4>
            <p> ` ${review.content} -- User #  ${review.userId} made this review.` </p>
          </div>
       )
      })
    </div>
  )
}

export default Reviews
