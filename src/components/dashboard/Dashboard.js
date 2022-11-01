import React, { Component } from 'react';
import BlogList from '../blogs/BlogList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    render() {

        const { blogs, auth } = this.props;

        var Loader = require("react-loader");

        if (!auth.uid) {
            return (
                <Redirect to='/signup' />
            );
        };

        if (blogs) {
            return (
                <div className="dashboard container" >
                    <div className="row">
                        <div className="col s12 m6">
                            <BlogList blogs={blogs} />
                        </div>
                        {blogs &&
                            <div className="col s12 m5 offset-m1">
                                <Notifications notifications={blogs.slice(0, 3)} />
                            </div>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container center">
                    <Loader />
                </div>
            );
        };
    };
};

const mapStateToProps = (state) => {
    return {
        blogs: state.firestore.ordered.blogs,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'blogs', orderBy: ['createdAt', 'desc'] },
    ])
)(Dashboard);
