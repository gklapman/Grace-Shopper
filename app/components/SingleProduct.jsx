import React from 'react'
import { Link } from 'react-router'
import {Reviews} from './Reviews.jsx'

const SingleProduct = (props) => {
  const meme = props.selectedmeme
  const review = props.reviews

  return (
   <div>
      <h3>{meme.name} <span>{meme.price} </span></h3>
      <img src={meme.photoURL}/>
      <p>{meme.producetInfo}</p>
      <h4>{meme.stock}</h4>
        <div>
          <Reviews review={review} />   {/ this will need to be all reviews for specific meme/}
        </div>
    </div>
  )
}

export default SingleProduct
