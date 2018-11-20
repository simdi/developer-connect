import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProfileActions from './profileActions';
import Education from './Education';
import Experience from './Experience';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading }  = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link></p>
            <ProfileActions />
            <Experience experience={(profile.experience.length > 0) ? profile.experience : []} />
            <Education education={(profile.education.length > 0) ? profile.education : []} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not setup a profile, Please use the button below to setup a profile.</p>
            <Link to="create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              { dashboardContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.proptypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateTopProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateTopProps, { getCurrentProfile, deleteAccount })(withRouter(Dashboard)); 