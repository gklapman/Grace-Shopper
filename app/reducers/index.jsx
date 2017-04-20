import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  meme: require('./meme').default,
  bars: require('./bars').default
})

export default rootReducer
