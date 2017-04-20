import React from 'react'
import { Link } from 'react-router'



const Reviews = ({review}) => {
  console.log('this is review', review)

  return (
    <div>
     { review.map( (review,index) => { return (
          <div style={{border: "1px solid black", padding:"5px"}} key={index}>
            <h3>{review.title} </h3>
            <h4>{review.stars} Star Review</h4>
            <p> {review.content} <br/> User # {review.user_id} made this review. </p>
          </div>
       )
      }) }
    </div>
  )
}

export default Reviews
