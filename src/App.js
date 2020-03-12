import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutSummary from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Switch>
        <Route exact path="/" component={BurgerBuilder}></Route>
        <Route exact path="/orders" component={Orders}></Route>
        <Route path="/checkout" component={CheckoutSummary}></Route>
        </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
