import React from 'react'
import {Link} from 'react-router'

export default (props) => {
  console.log('props', props)
  // expect to receive: array of products (which have a name, image, description, price, average rating)
  const shorten = (text) => {
    if (text.length < 32) {
      return text
    } else {
      return text.slice(0, 32) + '...'
    }
  }
    // todo: create function for displaying ratings as stars
    // todo: refactor styling to css
  return (
    <div>
      <ul>
        {props.products.map(product => {
          return (
            <li key={product.name}>
              <img style={{display: "inline"}} src={product.photo} alt={product.name}></img>
              <span>
                <div>{product.name}</div>
                <div>{product.price} {product.rating}</div>
                <div>{shorten(product.product_info)}</div>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}