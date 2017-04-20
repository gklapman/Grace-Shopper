import React from 'react'
import { Link } from 'react-router'
import {Reviews} from './Reviews.jsx'

const SingleProduct = (props) => {
  //console.log('prosp in singleproduct', props)
   const meme = props.selectedmeme
   const review = props.reviews
   console.log('slected meme***!',meme)


  return (
   <div>
     <h1> working </h1>
      <h3>{meme.data.name && meme.data.meme} <span>{meme.data.price} </span></h3>
      {/*<img src={meme.photoURL}/>
      <p>{meme.producetInfo}</p>
      <h4>{meme.stock}</h4>*/}
        <div>
          {/*<Reviews review={review} />   {/ this will need to be all reviews for specific meme/}*/}
        </div>
    </div>
  )

}

export default SingleProduct
