import axios from 'axios'

// initial state
const initialState = {
  pastitems: [],
}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_PAST_ITEMS:
      newState.pastitems = action.items
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





export default reducer