import React, { Component } from 'react';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log('Login User', loginUser);
    this.props.loginUser(loginUser);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will receive', nextProps);
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup type="email" placeholder="Email Address" onChange={this.onChange} value={this.state.email} name="email" error={errors.email} />
                <TextFieldGroup type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} name="password" error={errors.password} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propType = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));