import React from 'react';
import { Link } from 'react-router';

import admin from '../services/admin.js';
import Grid from './Grid.jsx';
import user from '../services/user'

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            user: user.getUser(),
            grid: '1',
            spinner: false
        };
        this.handleUploadItems = this.handleUploadItems.bind(this);
        this.handleAfterUpload = this.handleAfterUpload.bind(this);
        this.handleChangeGrid = this.handleChangeGrid.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentWillMount() {
        admin.initDashboard(data => this.handleAfterUpload(data));
    }

    componentDidMount() {
        user.initUserInStore(data => { if (data.role === 'admin'){ this.setState(data) } });
    }

    handleUploadItems(e) {
        let files = e.target.files;
        this.setState({spinner: true});
        if (files.length !== 0) admin.uploadItems(files, this.handleAfterUpload);
        e.target.value = ''
    }

    handleAfterUpload(data) {
        this.setState({images: [...data, ...this.state.images], spinner: false})
    }

    handleChangeGrid(params) {
        this.setState({ grid: params });
    }

    handleRemoveItem(id) {
        if (this.state.images.length === 0) return;

        let images = this.state.images.slice(0,);
        images = images.filter(el => el.id !== id);
        admin.removeImage(id);
        this.setState({images})
    }

    render() {
        let { login } = this.state.user;
        login = (login.slice(0,1)).toUpperCase() + login.slice(1,);

        return (
            <div className='account container'>
                <div className="label">Hello {login}</div>
                <div className="btn-wrapper">
                    <Link to="/admin/users" className="item">
                        Users
                    </Link>
                    <Link to="/admin" className="item">
                        Gallery
                    </Link>
                </div>
                {
                    this.props.children ? this.props.children :
                    <div className={'grid-wrapper' + (this.state.grid === '2' ? ' line-grid' : '') }>
                        <div className="layout-wrapper">
                            <div
                                className="item-layout"
                                style={{background: 'url(/img/001-layout.png) no-repeat center center'}}
                                onClick={this.handleChangeGrid.bind(null,'1')}
                            />
                            <div
                                className="item-layout"
                                style={{background: 'url(/img/002-list-button.png) no-repeat center center'}}
                                onClick={this.handleChangeGrid.bind(null, '2')}
                            />
                            <div
                                className="item-layout"
                                style={{background: 'url(/img/upload.png) no-repeat center center'}}
                            >
                                <span className={"spinner-wrapper" + (this.state.spinner ? ' active-spinner' : '')}>
                                    <div className="spinner" />
                                </span>
                                <input type="file" className="add-imege-btn" id="upload-files" multiple={true} onChange={this.handleUploadItems}/>
                                <label htmlFor="upload-files" className="upload" />
                            </div>
                        </div>
                        {
                            <Grid images={this.state.images} grid={this.state.grid} onRemove={this.handleRemoveItem} />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default  Account;