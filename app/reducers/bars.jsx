import axios from 'axios'

const initialState = {
  tags: [],
  ad: {}
}

const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_CATS:
      newState.tags = action.tags
      return newState
    default:
      return newState
  }
}

const LOAD_CATS = 'LOAD_CATS'
export const loadCats = (tags) => {
  return {type: LOAD_CATS, tags}
}

export const getCats = () => {
  return dispatch => {
    return axios.get('/api/tags')
    .then(tags => {
      dispatch(loadCats(tags.data))
    })
  }
}

export default reducer