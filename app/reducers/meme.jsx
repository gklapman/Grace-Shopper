import axios from 'axios'

// initial state
const initialState = {
  memes: {},
  meme: {}
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case ALL_MEMES:
      newState.memes = action.memes
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

// thunks
export const getMemes = () => {
    dispatch => {
        axios.get('/api/memes')
        .then(memes => {
            dispatch(allMemes(memes))
        })
        .catch(err => {
            console.log('error!', err)
        })
    }
}

export const getMeme = (memeId) => {
    dispatch => {
        axios.get(`/api/memes/${memeId}`)
        .then(meme => {
            dispatch(oneMeme(meme))
        })
        .catch(err => {
            console.log('error!', err)
        })
    }
}