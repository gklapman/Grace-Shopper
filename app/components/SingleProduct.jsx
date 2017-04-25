import React from 'react'
import { Link } from 'react-router'

const SingleProduct = (props) => {
  const meme = props.props.selectedmeme

  const starify = (rating) => {
    let stars = ''
    const n = Number(rating)
    for (let i = 0; i < Math.round(n); i++) {
      stars += '★'
    }
    return stars
  }

  return (
    <div>
        <h3>{meme.name} ${meme.price}<br />{starify(meme.rating)}</h3>
        <img className="single-display" src={meme.photo}/>
        <p>{meme.product_info}</p>
        <p>User reviews gave {meme.name} an average of {meme.rating}/5.00</p>
        <h4>There are {meme.stock} left in stock</h4>
        <hr/>
    </div>
  )
}

export default SingleProduct
