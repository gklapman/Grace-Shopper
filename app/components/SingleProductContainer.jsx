import Reat from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import SingleProduct from './SingleProduct'

const mapDispatchToProps = null;

const mapStateToProps = function(state) {
  console.log('this is state', state )
  return {
    reviews: state.reviews,
    selectedmeme: state.meme.selectedMeme
  }
}


const ConnectedSingleProducet = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default ConnectedSingleProducet

