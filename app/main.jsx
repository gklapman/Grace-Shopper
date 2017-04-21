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
import CartIcon from './components/CartIcon'

import LoginLogoutContainer from './components/LoginLogoutContainer'
import SearchContainer from './components/SearchContainer'
import SingleProductContainer from './components/SingleProductContainer'



import ProductsContainer from './containers/Products'
import {getMemes} from './reducers/meme'

import { getMeme } from './reducers/meme'
import { getReviews } from './reducers/meme'



const ExampleApp = connect(
  ({ auth }) => ({ user: auth }))

(
  ({ user, children }) =>
    <div>
      <nav className="navbar navbar-default">
        <LoginLogoutContainer className="navbar-nav"/>
        <CartIcon className="navbar-nav" />
        <SearchContainer />
      </nav>
      {children}
    </div>
)

const onProductContainerEnter = () => {
  return store.dispatch(getMemes())
}
const loadSingleProduct = () => {
  let productNum = browserHistory.getCurrentLocation().pathname.split('/')[2]
  store.dispatch(getMeme(productNum))
  store.dispatch(getReviews(productNum))
}
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/products" />
        <Route path="/products" onEnter={onProductContainerEnter} component={ProductsContainer} />
        <Route path="/products/:productId" component={SingleProductContainer} onEnter={loadSingleProduct} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

