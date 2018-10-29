import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import NavBar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

if (localStorage.jwtToken) {
    // Set Auth token in headers
    setAuthToken(localStorage.jwtToken);
    // Decode jwtToken and get user info and expiry
    const decode = jwtDecode(localStorage.jwtToken);
    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
