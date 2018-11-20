import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '7242cfb60b6d41e85411',
      clientSecret: 'f7a2694f074be85a496c3115bddaeb5659a001c9',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    const url = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;
    fetch(url).then(res => res.json()).then(data => {
        if (this.refs.myRef) {
            this.setState({ repos: data });
        }
    }).catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    let repoItems;
    if (repos.length > 0) {
        repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                <div className="col-md-6">
                    <h4>
                    <Link to={repo.html_url} className="text-info" target="_blank">
                        {repo.name}
                    </Link>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                    Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                    Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge badge-success">
                    Forks: {repo.forks_count}
                    </span>
                </div>
                </div>
            </div>
        ));
    } else {
        repoItems = <h5 className="mb-4">Github Repos not found or Account not found</h5>;
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;