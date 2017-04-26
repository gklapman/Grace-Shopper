import axios from 'axios'

// initial state
const initialState = {
  pastitems: [],
  allitems: [],
  singleItem: {}
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_PAST_ITEMS:
      newState.pastitems = action.items
      return newState
    case LOAD_ALL_ITEMS: 
      newState.allitems = action.items
      return newState
    case LOAD_SINGLE_ITEM: 
      newState.singleItem = action.item
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_PAST_ITEMS = 'LOAD_PAST_ITEMS'
export const loadPastOrderItems = (items) => {
  return {type: LOAD_PAST_ITEMS, items}
}

const LOAD_ALL_ITEMS = 'LOAD_ALL_ITEMS'
export const loadAllPastItems = (items) => {
  return {type: LOAD_ALL_ITEMS, items}
}


const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM'
export const loadSingleOrderItem = (item) => {
  return {type: LOAD_SINGLE_ITEM, item}
}

// thunks
export const loadPastItems = () => {
  return dispatch => {
    return axios.get(`/api/pastorders/`)
    .then(res => {
      dispatch(loadPastOrderItems(res.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const loadAllItems = () => {
  return dispatch => {
    return axios.get(`/api/pastorders/allorders/`)
    .then(res => {
      dispatch(loadAllPastItems(res.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}

export const loadSingleItem = (cartId) => {
  return dispatch => {
    return axios.get(`/api/pastorders/order/${cartId}`)
    .then(res => {
      dispatch(loadSingleOrderItem(res.data))
    })
    .catch(err => {
      console.log('error!', err)
    })
  }
}




export default reducer