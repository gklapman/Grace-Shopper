import React from 'react'
import {Link} from 'react-router'

export default (props) => {
  console.log('props', props)
  // expect to receive: array of products (which have a name, image, description, price, average rating)
  const shorten = (text) => {
    if (text.length < 64) {
      return text
    } else {
      return text.slice(0, 64) + '...'
    }
  }
    // todo: create function for displaying ratings as stars
    // todo: refactor styling to css
  return (
    <div>
      <ul className="produce">
        {props.products.map(product => {
          return (
            <li key={product.name}>
              <img src={product.photo} alt={product.name}></img>
              <span className="in-block">
                <div className="name">{product.name}</div>
                <div className="price">$$$ {product.price} $$$</div>
                <div className="rating">{product.rating}/5.00 starz based on user reviews</div>
                <div className="info">{shorten(product.product_info)}</div>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}