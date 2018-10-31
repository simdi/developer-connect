import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { clearCurrentProfile } from './actions/profileActions';

import NavBar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

if (localStorage.jwtToken) {
    // Set Auth token in headers
    setAuthToken(localStorage.jwtToken);
    // Decode jwtToken and get user info and expiry
    const decode = jwtDecode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));
    // Logout user if token expires
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Clear current profile
      store.dispatch(clearCurrentProfile);
      // Redirect to login page
      window.location.href = '/login';
    }
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
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
