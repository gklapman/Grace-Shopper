import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  meme: require('./meme').default,
  bars: require('./bars').default,
  cart: require('./cart').default,
  pastorders: require('./pastorders').default,
})

export default rootReducer
