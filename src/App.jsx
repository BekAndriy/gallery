import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Head from './components/Head.jsx'
import Footer from './components/Footer.jsx'
import store from './dispatcher/reducers.js';
import User from './services/user';
import './components/less/common.less';

class App extends React.Component {

    componentWillMount() {
        User.initUser(user => {
            if ( user.error ) store.dispatch({ type: 'USER', user: { logged: false, role: 'guest' } });
            else store.dispatch({ type: 'USER', user })
        });
    }

    handleClick() {

    }

    render() {
        console.log(this.props.location.pathname);
        return (
            <div className={'App' + ( this.props.location.pathname === '/' ? ' home-page' : '' )}>
                <Head />
                {
                    this.props.children ? this.props.children :
                    <div className="container">
                        <span className="label">Home Page</span>
                        <div className="home-image" style={{background: 'url(../img/265H.jpg) no-repeat 50% 50%'}} />
                    </div>
                }
                <Footer />
            </div>
        );
    }
}

export default App;