import React from 'react';
import {render} from 'react-dom';
import productsData from './data/products';
import cartReducer from './controllers/cart';
import productsReducer from './controllers/products';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {Route, Router, browserHistory, Redirect, hashHistory} from 'react-router'
import {Left, Whoops404} from "./components";
import CheckoutPage from "./pages/CheckoutPage";
import Products from "./pages/Products";
import Home from "./pages/Home";
import TransformerList from "./pages/TransformerList";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    routing: routerReducer
});

let store = createStore(
    rootReducer,
    {
        products: productsData // initial store values
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);
const history = syncHistoryWithStore(hashHistory, store);

/* UNCOMMENT THE CODE BELOW */

/**
history.listen(location => {

    var event = new CustomEvent('at-view-start', { detail: location.pathname });

    document.dispatchEvent(event);
    console.log("changed location event was dispatched", event)
});
**/

window.React = React

render(
    <Provider store={store}>
        <Router history={history}>
            <Redirect from="/" to="home"></Redirect>
            <Route path="/" component={Left}>
                <Route path="/home" component={Home}/>
                <Route path="/transformers" component={TransformerList}/>
                <Route path="/products" component={Products}/>
                <Route path="/cart" component={CheckoutPage}/>
            </Route>
            <Route path="*" component={Whoops404}/>
        </Router>
    </Provider>

    ,
    document.getElementById('react-container'));
