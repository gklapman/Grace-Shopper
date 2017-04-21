import Reat from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import SingleProduct from './SingleProduct'

import {addReviewThunk} from '../reducers/meme'

const mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(obj) {
      dispatch(addReviewThunk(obj))
    }
  }
}

const mapStateToProps = function(state) {
  return {
    reviews: state.meme.reviews,
    selectedmeme: state.meme.selectedMeme,
    currenetUser: state.auth
  }
}


const ConnectedSingleProducet = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default ConnectedSingleProducet


