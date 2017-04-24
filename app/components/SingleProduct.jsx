import React from 'react'
import { Link } from 'react-router'

const SingleProduct = (props) => {
  const meme = props.props.selectedmeme

  return (
    <div>{}
        <h3>{meme.name} <span>$ {meme.price} </span></h3>
        <img src={meme.photo}/>
        <p>{meme.product_info}</p>
        <h4>We have this many in stock: {meme.stock}</h4>
        <hr/>
    </div>
  )
}

export default SingleProduct
