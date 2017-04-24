import axios from 'axios'

// initial state
const initialState = {
  cart: [],
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_ITEMS:
      newState.cart = action.items
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_ITEMS = 'LOAD_ITEMS'
export const loadItems = (items) => {
  return {type: LOAD_ITEMS, items}
}



// thunks
export const loadCartItems = () => {
  console.log('LOADING CART ITEMS WITH THIS USER ')
  return dispatch => {
    return axios.get(`/api/carts/user`)
    .then(res => {
      if (typeof res.data !== 'string'){
      dispatch(loadItems(res.data))
      }
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}



export const addCartItem = function(memeId, userId) {
  return (dispatch, getState) => {
    return axios.post('/api/carts', {memeId, userId})
    .then(res => {
      return res.data
    })
    .then((cart) => {
      if (userId) {
        dispatch(loadCartItems(userId))
      } else {
        dispatch(loadItems(cart))
      }
    })
    .catch((error) => console.error(error))
  }
}

export default reducer
