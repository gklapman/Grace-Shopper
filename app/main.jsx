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

import Sidebar from './components/Sidebar'
import Adbar from './components/Adbar'
import LoginLogoutContainer from './components/LoginLogoutContainer'
import SearchContainer from './components/SearchContainer'
import SingleProductContainer from './containers/SingleProductContainer'

import ProductsContainer from './containers/Products'
import {getMemes, getMeme, getReviews, getMemesForOneTag} from './reducers/meme'
import { getCats } from './reducers/bars'



const MemeApp = connect(
  ({ auth }) => ({ user: auth }))

(
  ({ user, children }) =>
    <div>
      <nav className="navbar navbar-default container-fluid">
        <div className="col-md-6">
          <LoginLogoutContainer />
        </div>
        <div className="col-md-4">
          <SearchContainer />
        </div>
        <div className="col-md-2">
          <CartIcon />
        </div>
      </nav>
      <div className="container-fluid">
        <Sidebar />
        <div className="col-md-8">
          {children}
        </div>
        <Adbar />
      </div>
    </div>
)

const onEnterLoadCategories = () => {
  return store.dispatch(getCats())
}
const onProductCategoryEnter = (req) => {
  console.log(req)
  return store.dispatch(getMemesForOneTag(Number(req.params.tagId)))
}
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
      <Route path="/" component={MemeApp} onEnter={onEnterLoadCategories} >
        <IndexRedirect to="/products" />
        <Route path="/products" component={ProductsContainer} onEnter={onProductContainerEnter} />
        <Route path="/products/categories/:tagId" component={ProductsContainer} onEnter={onProductCategoryEnter} />
        <Route path="/products/:productId" component={SingleProductContainer} onEnter={loadSingleProduct} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

