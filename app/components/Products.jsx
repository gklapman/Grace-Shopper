import React from 'react'
import {Link} from 'react-router'


export default (props) => {



  const addToCart = function(event){
    let userId = props.currentUser.id || null
    let productId = event.target.value
    props.addCartItem(productId, userId)
  }


  // expect to receive: array of products (which have a name, image, description, price, average rating)
  const shorten = (text) => {
    if (text.length < 108) {
      return text
    } else {
      return text.slice(0, 108) + '...'
    }
  }
  const starify = (rating) => {
    let stars = ''
    const n = Number(rating)
    for (let i = 0; i < Math.round(n); i++) {
      stars += '★'
    }
    return stars
  }

  // clump function groups list itmes into rows
  const clump = produce => {
    let rows = []
    for (let i = 0; i < produce.length; i += 2) {
      let row = produce.length - i > 1 ? produce.slice(i, i + 2) : produce.slice(i)
      rows.push(row)
    }
    return rows.map((row, index) => {
      return(
        <div key={index} className="row">
          {row.map(product => {
            return (
              <div key={product.id} className="col-md-6 on-display">
                <button value={product.id} className="btn btn-default" onClick={addToCart}>Add to Cart</button>
                <Link to={`/products/${product.id}`}>
                  <img src={product.photo} alt={product.name}></img>
                  <div className="name col-md-4">{product.name}</div>
                  <div className="name col-md-4">{starify(product.rating)}</div>
                  <div className="price col-md-4">$$$ {product.price} $$$</div>
                  <div className="info">Description: {shorten(product.product_info)}</div>
                  <div className="rating">{product.rating}/5.00 starz based on user reviews</div>
                </Link>
                <button value={product.id} className="btn btn-default" onClick={addToCart}>Add to Cart</button>
              </div>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div>
      <div className="produce">
        {clump(props.products)}
      </div>
    </div>
  )
}


 // 