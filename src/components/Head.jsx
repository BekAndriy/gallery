import React from 'react';
import { Link } from 'react-router';
import user from '../services/user'

const menuItems = [

    {
        name: 'Home',
        type: ['guest','admin','user'],
        url:  '/'
    },
    {
        name: 'About us',
        type: ['guest','admin','user'],
        url:  '/about-us'
    },
    {
        name: 'Gallery',
        type: ['guest','admin','user'],
        url:  '/gallery'
    },
    {
        name: 'Account',
        type: ['admin'],
        url:  '/admin'
    },
    {
        name: 'Sign In',
        type: ['guest'],
        url:  '/login'
    },
    {
        name: 'Logout',
        type: ['admin','user'],
        url:  '/',
        event: 'handleLogout'
    }
];

class Head extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'guest'
        };
    }

    componentDidMount() {
        user.initUserInStore(data => this.setState(data));
    }

    handleLogout(event) {
        event.stopPropagation();
        user.logout();
    }

    render() {
        return (
            <div className='header'>
                <div className="container">
                    <nav className='nav'>
                        {
                            menuItems.map((el, ind) => {
                                if (this.state.user && el.type.indexOf(this.state.user.role)!== -1) {
                                    return el.event ?
                                        <Link
                                            key={ind}
                                            to={el.url}
                                            className="item"
                                            onClick={this[el.event]}
                                        >
                                            { el.name }
                                        </Link>
                                    :
                                    <Link
                                        key={ind}
                                        to={el.url}
                                        className="item"
                                    >
                                        { el.name }
                                    </Link>;
                                }
                            })
                        }
                    </nav>
                </div>
            </div>
        );
    }
}

export default  Head;