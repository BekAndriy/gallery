import React from 'react';
import admin from '../services/admin';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            changedUser: {}
        };
        this.handleChangeRole = this.handleChangeRole.bind(this);
    }

    componentWillMount() {
        admin.getUsers(data => this.setState({users: data.users}))
    }

    handleAddSelect(user) {
        let role = this.state.changedUser[user.id + '-role'] ? this.state.changedUser[user.id + '-role'] : user.id+'-'+user.role;
        return (
            <SelectField value={role} onChange={this.handleChangeRole} id={user.id}>
                <MenuItem value={user.id+'-admin'} primaryText="Admin"/>
                <MenuItem value={user.id+'-user'} primaryText="User"/>
            </SelectField>
        )
    }

    handleChangeRole(event, index, value) {
        let userId = value.match(/^[0-9]+/)[0];

        this.state.changedUser[userId+'-role'] = value;
        this.setState({changedUser: this.state.changedUser});

        admin.changeRole(userId, value.match(/[^0-9-]+/)[0], (data) => {})
    }

    render() {
        return (
            <div className='admin-users container'>
                <div className="title">Registered users</div>
                <div className="users-wrapper">
                    <div className="head">
                        <div className="id">ID</div>
                        <div className="created">Created</div>
                        <div className="login">Login</div>
                        <div className="role">Role</div>
                    </div>
                    {
                        this.state.users.map((user, ind) =>
                            <div className="user" key={ind}>
                                <div className="user-id">{user.id}</div>
                                <div className="user-date">{user.date}</div>
                                <div className="user-login">{user.login}</div>
                                <div className="user-role">
                                    {this.handleAddSelect(user)}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default  Footer;