import React from 'react'
import { Link } from 'react-router'
import Reviews from './Reviews.jsx'

const SingleProduct = (props) => {
  const reviews = props.reviews
  const meme = props.selectedmeme

  return (
   <div>
      <h3>{meme.name} <span>$ {meme.price} </span></h3>
      <img src={meme.photo}/>
      <p>{meme.product_info}</p>
      <h4>We have this many in stock: {meme.stock}</h4>
        <div>
            <Reviews review={props.reviews} />
        </div>
    </div>
  )
}

export default SingleProduct
