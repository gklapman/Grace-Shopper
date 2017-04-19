import Reat from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { SingleProduct } from './SingleProduce.jsx'

const mapDispatchToProps = null;

const mapStateToProps = function(state) {
  return {
    reviews: state.reviews,
    selectedmeme: state.selectedmeme.meme
  }
}


const ConnectedSingleProducet = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default ConnectedSingleProducet


