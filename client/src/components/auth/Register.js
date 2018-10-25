import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      errors: {

      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    }

    console.log('New User', newUser);
    const res = this.submitApI('/api/users/register', newUser);
    console.log('Res from API ', res);
  }

  async submitApI(url, payload) {
    await new Promise((resolve, reject) => {
      axios.post(url, payload).then(res => {
        console.log('Res', res);
        resolve(res);
      }).catch(err => {
        console.log('Error', err.response.data.errors);
        resolve();
      });
    });
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}/>
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Phone number" name="phone" value={this.state.phone} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.onChange} name="password"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="confirm_password" value={this.state.password2} onChange={this.onChange}/>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
