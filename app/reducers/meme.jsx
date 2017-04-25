import axios from 'axios'

// initial state
const initialState = {
  memes: [],
  selectedMeme: {},
  tags: [],
  reviews: [],
  selectedReview: {}
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case ALL_MEMES:
      newState.memes = action.memes
      return newState
    case ONE_MEME:
      newState.selectedMeme = action.meme
      return newState
    case ALL_REVIEWS:
      newState.reviews = action.reviews
      return newState
    case ONE_REVIEW:
      newState.selectedReview = action.review
      return newState
    case LOAD_TAGS:
      newState.tags = action.tags
      return newState
    default:
      return newState
  }
}

// constants and action creators
const ALL_MEMES = 'ALL_MEMES'
export const allMemes = (memes) => {
  return {type: ALL_MEMES, memes}
}

const ONE_MEME = 'ONE_MEME'
export const oneMeme = (meme) => {

  return {type: ONE_MEME, meme}
}

const ALL_REVIEWS = 'ALL_REVIEWS'
export const allReviews = (reviews) => {
  return {type: ALL_REVIEWS, reviews}
}

const ONE_REVIEW = 'ONE_REVIEW'
export const oneReview = (review) => {
  return {type: ONE_REVIEW, review}
}

const LOAD_TAGS = 'LOAD_TAGS'
export const loadTags = (tags) => {
  return {type: LOAD_TAGS, tags}
}

// thunks
export const getMemes = () => {
  return dispatch => {
    return axios.get('/api/memes')
    .then(memes => {
      dispatch(allMemes(memes.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const getMeme = (memeId) => {
  return dispatch => {
    return axios.get(`/api/memes/${memeId}`)
    .then(meme => {
      dispatch(oneMeme(meme.data))
      dispatch(getReviews(memeId))
      dispatch(getTags(memeId))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const getReviews = (memeId) => {
  return dispatch => {
    return axios.get(`/api/memes/${memeId}/reviews`)
    .then(reviews => {
      dispatch(allReviews(reviews.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const getReview = (memeId, userId) => {
  return dispatch => {
    return axios.get(`/api/memes/${memeId}/reviews/${userId}`)
    .then(review => {
      dispatch(oneReview(review.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const getTags = (memeId) => {
  return dispatch => {
    return axios.get(`/api/memes/${memeId}/tags`)
    .then(tags => {
      dispatch(loadTags(tags.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const getMemesForOneTag = (tagId) => {
  return dispatch => {
    return axios.get(`/api/tags/${tagId}`)
    .then(memes => {
      dispatch(allMemes(memes.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const postReview = (data) => {
  console.log('hts post', data)
  return dispatch => {
    return axios.post('/api/reviews', data)
      .then(function(data) {
        console.log( data)
      })
  }
}

export const editProduct = (data) => {
  return dispatch => {
    return axios.put('/api/edit/memeid', data)
      .then(function(data){
        console.log(data)
      })
  }
}

export default reducer
