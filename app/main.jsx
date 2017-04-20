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
import ProductsContainer from './containers/Products'
import {getMemes} from './reducers/meme'

import { getMeme } from './reducers/meme'
import { getReviews } from './reducers/meme'

import SingleProductContainer from './components/SingleProductContainer'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
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
