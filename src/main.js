import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux'
import store from './dispatcher/reducers.js';
import session from './services/session.js';
import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import AboutUs from './components/AboutUs.jsx'
import Gallery from './components/Gallery.jsx'
import Account from './components/Account.jsx'
import RegisteredUsers from './components/RegisteredUsers.jsx'
import Redirect from './components/Redirect.jsx'

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <Route path='/login' component={session.role(LoginPage, ['guest'], Redirect)} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/admin" component={session.role(Account, ['admin'])}>
                    <Route component={RegisteredUsers} path="/admin/users" />
                </Route>
                <Route path="/gallery" component={Gallery} />
                <Route component={NotFoundPage} path="*" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

