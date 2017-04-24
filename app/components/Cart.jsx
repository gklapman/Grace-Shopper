import React from 'react'
import {connect} from 'react-redux'
import {addCartItem} from '../reducers/cart.jsx'


class Cart extends React.Component {


  render() {


    return (

      <div className="container-fluid">
          {cart && cart.map(item=> {
            {console.log('the item is ', item)}
            return <div key={item.meme_Id}>
              <h5>{item.name} <span> {item.quantity} </span></h5>
              <img src={item.photo}/>

              <button value={item.meme_Id}>+</button>
            </div>
          })}
         
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currentUser: state.auth
  }
}

const mapDispatchToProps = {addCartItem}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)