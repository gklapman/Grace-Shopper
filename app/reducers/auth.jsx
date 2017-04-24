import axios from 'axios'
import {loadCartItems} from '../reducers/cart.jsx'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

// export const login = (email, password) =>
//   dispatch =>
//     axios.post('/api/auth/login/local',
//       {email, password})
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))

export const login = function(email, password) {
  return (dispatch, getState) => {
    return axios.post('/api/auth/login/local', {email, password})
      .then((res) => {
        if (typeof res.data === 'string'){
          alert(res.data)
        }
      })
      .then(() => {
        dispatch(whoami())
        dispatch(loadCartItems(res.data.id))
      })
      .catch(() => dispatch(whoami()))
  }
}

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
    .catch(failed => dispatch(authenticated(null)))

export const signup = function(email, password, address, name) {
  return (dispatch, getState) => {
    return axios.post('/api/auth/signup', {email, password, address, name})
    .then(() => dispatch(login(email, password)))
     .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
  }
}

// clicks for oauth

export default reducer
