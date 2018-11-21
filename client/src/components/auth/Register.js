import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };

    // Call the dispatcher
    this.props.registerUser(payload, this.props.history);
  }

  render() {
    const { errors } = this.state; 
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate  onSubmit={this.onSubmit}>
                <TextFieldGroup type="text" placeholder="Name" onChange={this.onChange} value={this.state.name} name="name" error={errors.name} />
                <TextFieldGroup type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} name="email" error={errors.email} info="If you have a gravatar accout please use it." />
                <TextFieldGroup type="text" placeholder="Phone Number" onChange={this.onChange} value={this.state.phone} name="phone" error={errors.phone} />
                <TextFieldGroup type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} name="password" error={errors.password} />
                <TextFieldGroup type="password" placeholder="Password" onChange={this.onChange} value={this.state.confirm_password} name="confirm_password" error={errors.confirm_password} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
