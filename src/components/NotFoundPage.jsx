import React from 'react';
import { Link } from 'react-router';

class NotFoundPage extends React.Component {

    render() {
        return (
            <div className='page-not-found'>
                <div className="wrapper">
                    <div className="main">404</div>
                    <div className="second">Not found</div>
                    <p>We’re sorry, the page you have looked for does not exist in our database!
                        Perhaps you would like to go to our <Link to="/">home page</Link>?</p>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;