'use strict'
import React from 'react'
import {Link, Router, Route, IndexRedirect, browserHistory} from 'react-router'
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
import SingleProductContainer from './containers/SingleProductContainer.js'
import Cart from './components/Cart'
import Sidebar from './components/Sidebar'
import Adbar from './components/Adbar'

import PastOrders from './components/PastOrders'

import ProductsContainer from './containers/Products'
import {getMemes, getMeme, getReviews, getMemesForOneTag} from './reducers/meme'
import { getCats } from './reducers/bars'


import {loadCartItems} from './reducers/cart.jsx'

import {loadPastItems} from './reducers/pastorders.jsx'

// TODO: write as own container
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
        <Link to="/">
          <div className="store">
            <span className="green">memes</span><span className="red">R</span><span className="blue">us</span>
          </div>
        </Link>
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

const onEnterLoadInfo = () => {
  store.dispatch(getCats())

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
const loadCart = () => {
  store.dispatch(loadCartItems())
}

const loadPastOrderEnter = () => {
  store.dispatch(loadPastItems())
}

const loadCartItemsEnter = () => {
  store.dispatch(loadCartItems())
}



render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MemeApp} onEnter={onEnterLoadInfo} >
        <IndexRedirect to="/products" />
        <Route path="/products" component={ProductsContainer} onEnter={onProductContainerEnter} />
        <Route path="/products/categories/:tagId" component={ProductsContainer} onEnter={onProductCategoryEnter} />
        <Route path="/products/:productId" component={SingleProductContainer} onEnter={loadSingleProduct} />
        <Route path='/cart' component={Cart} onEnter={loadCartItemsEnter}/>
        <Route path='/pastorders' component={PastOrders} onEnter={loadPastOrderEnter}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)


