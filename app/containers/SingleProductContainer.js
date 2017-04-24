import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import SingleProduct from '../components/SingleProduct'
import ReviewsContainer from './ReviewsContainer'


class SingleProductContainer extends React.Component {
  render(props) {
    return (
      <div>
        <SingleProduct props = {this.props}/>
        <ReviewsContainer/>
      </div>
    )
  }
}

const mapDispatchToProps = null;

const mapStateToProps = function(state) {
  return {
    selectedmeme: state.meme.selectedMeme,
    currentUser: state.auth
  }
}

const ConnectedSingleProducet = connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer)

export default ConnectedSingleProducet


