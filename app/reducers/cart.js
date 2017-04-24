import axios from 'axios'

// initial state
const initialState = {
  cart: [],
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case ALL_ITEMS:
      newState.cart = action.items
      return newState
    case ADD_ITEM:
      newState.cart = newState.cart.concat(item)
      return newState
    default:
      return newState
  }
}

// constants and action creators
const ALL_ITEMS = 'ALL_ITEMS'
export const allItems = (items) => {
  return {type: ALL_ITEMS, items}
}

const ADD_ITEM = 'ADD_ITEM'
export const addMeme = (item) => {
  return {type: ADD_ITEM, item}
}


// thunks
export const getItems = (userId) => {
  return dispatch => {
    return axios.get('/api/carts')
    .then(items => {
      dispatch(allItems(items.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const addItem = (memeId, userId) => {
  return dispatch => {
    return axios.get(`/api/carts`, {meme_Id: memeId, user_Id: userId})
    .then(item => {
      dispatch(addItem(item.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}


export default reducer