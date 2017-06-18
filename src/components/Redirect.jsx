import React from 'react';

class Redirect extends React.Component {

    componentWillMount() {
        this.props.history && this.props.history.push("/");
    }

    render() {
        return (<div className='redirect' />);
    }
}

export default Redirect;