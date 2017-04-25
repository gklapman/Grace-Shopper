import React from 'react'
import {connect} from 'react-redux'
import Products from '../components/Products'
import Sidebar from '../components/Sidebar'
import Adbar from '../components/Adbar'
import {getMemes} from '../reducers/meme'
import {addCartItem} from '../reducers/cart.jsx'

class ProductsContainer extends React.Component {

  render() {
    return (
      <Products products={this.props.memes} addCartItem={this.props.addCartItem} currentUser={this.props.currentUser} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memes: state.meme.memes,
    currentUser: state.auth
  }
}

const mapDispatchToProps = {addCartItem}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
