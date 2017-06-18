import React from 'react';
import store from '../dispatcher/reducers';
import User from './user.js';

import NotFoundPage from '../components/NotFoundPage.jsx';
import Redirect from '../components/Redirect.jsx';
import { generateFetch } from './common';
import $ from 'jquery';

const session = {
    authorize(params, callback) {
        let init = generateFetch(params);

        $.ajax(init).done(function(data){
            let _data = JSON.parse(data);

            if (_data.error && typeof callback === 'function') callback(_data.error);
            if (_data.user) {
                _data.user.logged = true ;
                store.dispatch({ type: 'USER', user: _data.user });
            }
        });
    },

    role(WrappedComponent, allowedRoles, SecondComponent) {
        return class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    user: User.getUser()
                }
            }

            componentDidMount() {
                User.initUserInStore(data => { if (data) this.setState(data) })
            }

            render() {
                if (allowedRoles.indexOf(this.state.user.role)!== -1) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return SecondComponent ? <SecondComponent {...this.props} /> : <NotFoundPage {...this.props} />
                }
            }
        }
    }
};

export default session;