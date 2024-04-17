import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup/signup';
import LoginForm from './Login/login';
import HomePage from './Login/homePage';
import AddProductForm from './AddProducts/addProducts';
import ProductList from './DisplayProducts.js/ProductList';
import CartPage from './Cart/Cart';

function App() {
    const [userState, setUserState] = useState(null);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/addProducts' component={AddProductForm}/>
                    <Route exact path='/displayProducts' component={ProductList}/>
                    <Route exact path='/cart' component={CartPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
