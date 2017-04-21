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
import CartIcon from './components/CartIcon.jsx'

import LoginLogoutContainer from './containers/LoginLogoutContainer.jsx'
import SearchContainer from './containers/SearchContainer.jsx'
import SingleProductContainer from './components/SingleProductContainer.jsx'



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
  store.dispatch(getMeme(1))
  store.dispatch(getReviews(1, 1))
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



// <Route path="/products" component={AllProductsContainer} />
        // <Route path="products/:productId" component={SingleProductContainer}/>
        // <Route path="mycart" component={Cart} />