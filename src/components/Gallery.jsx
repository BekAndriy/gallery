import React from 'react';
import user from '../services/user';
import { API } from '../constants/constants';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentWillMount() {
        user.initGallery(data => this.setState({images: data.images}));
    }

    render() {
        return (
            <div className='gallery container'>
                <span className="label">Gallery</span>
                <div className="images-wrapper">
                    {
                        this.state.images.map((el,ind) =>
                            <div className="image" key={ind}>
                                <div className="image-block" style={{background: 'url("'+API.link + el.image+'") no-repeat 50% 50%'}} />
                                { el.tooltip ?
                                    <span className="tooltip">
                                        { el.tooltip }
                                    </span> : ''
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default  Footer;