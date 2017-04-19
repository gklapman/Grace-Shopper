'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import LoginLogoutContainer from './components/LoginLogoutContainer'



const ExampleApp = connect(
  ({ auth }) => ({ user: auth }))

(
  ({ user, children }) =>
    <div>
      <nav>
        <LoginLogoutContainer />
      </nav>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)



// <Route path="/products" component={AllProductsContainer} />
        // <Route path="products/:productId" component={SingleProductContainer}/>
        // <Route path="mycart" component={Cart} />