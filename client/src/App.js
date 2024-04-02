import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/signup';
import login from './components/Login/login';
import main from './components/Main/main';
import AddProductForm from './components/addProduct/addProduct';
import ProductList from './components/displayProducts/displayProducts';
import OrderManagement from './components/orderManager/orderManager';
import OrderForm from './components/createOrder/orderCreation';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path='/login' component={login} />
          <Route exact path='/dashboard' component={main}/>
          <Route exact path="/addProduct" component={AddProductForm} />
          <Route exact path='/displayProducts' component={ProductList}/>
          <Route exact path="/orders" component={OrderManagement} />
          <Route exact path="/orderCreation" component={OrderForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
