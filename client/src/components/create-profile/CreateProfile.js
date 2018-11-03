import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: PropTypes.object.isRequired
});

export default connect(mapStateToProps, {})(CreateProfile);