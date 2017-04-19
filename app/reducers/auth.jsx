 import axios from 'axios'

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

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

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

export const oauth = (strategy) => 
  dispatch => 
    axios.get(`/api/auth/login/${strategy}`)
    // .then(response => {
    //   const user = response.data
    //   dispatch(authenticated(user))
    // })
    // .catch(failed => dispatch(authenticated(null)))
     .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signup = (email, password, address, name) => 
  dispatch => 
    axios.post('/api/auth/signup')
    .then(()=> dispatch(login(email, password)))
     .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
   



//clicks for oauth

export default reducer
