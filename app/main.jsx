'use strict'
import React from 'react'
import {Link, Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

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
import Checkout from './components/Checkout'
import SingleOrderItem from './components/SingleOrderItem'

import PastOrders from './components/PastOrders'

import ProductsContainer from './containers/Products'
import {getMemes, getMeme, getReviews, getMemesForOneTag} from './reducers/meme'
import { getCats } from './reducers/bars'


import {loadCartItems} from './reducers/cart.jsx'

import {loadPastItems, loadAllItems, loadSingleItem} from './reducers/pastorders.jsx'

import ProductManagement from './containers/productManagementContainer'
import OrderManagement from './containers/orderManagementContainer'
import UserManagement from './containers/userManagementContainer'
import AdminPanel from './containers/adminPanel'


import MemeApp from './containers/MemeApp'


// on enter hooks

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

const loadOrdersEnter = () => {
  store.dispatch(loadAllItems())
}

const loadSingleOrderEnter = (nextRouterState) => {
  console.log('inside of load single with this nextRouterState', nextRouterState.params.itemId)
  store.dispatch(loadSingleItem(nextRouterState.params.itemId))
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
        <Route path='/admin' component={AdminPanel}>
          <Route path='productManagement' component={ProductManagement} onEnter={onProductContainerEnter}/>
          <Route path='orderManagement' component={OrderManagement} onEnter={loadOrdersEnter}/>
          <Route path='orderManagement/:itemId' component={SingleOrderItem} onEnter={loadSingleOrderEnter} />
          <Route path='userManagement' component={UserManagement}/>
        </Route>

      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)


