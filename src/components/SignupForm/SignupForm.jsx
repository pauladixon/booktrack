import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as userAPI from '../../services/user-api';

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3> <br/>
        <form className="ui form" onSubmit={this.handleSubmit} >
          <div className="field">
            <input 
              type="text"
              placeholder="Name" 
              value={this.state.name} 
              name="name" 
              onChange={this.handleChange} 
            />
          </div>
          <div className="field">
            <input 
              type="email"
              placeholder="Email" 
              value={this.state.email} 
              name="email" 
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input 
              type="password" 
              placeholder="Password" 
              value={this.state.password} 
              name="password" 
              onChange={this.handleChange} 
            />
          </div>
          <div className="form-group field">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={this.state.passwordConf} 
              name="passwordConf" 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <button 
              className="ui button" 
              disabled={this.isFormInvalid()}       
            >
              Sign Up
            </button>
            &nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
