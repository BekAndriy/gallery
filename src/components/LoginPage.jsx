import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import session from '../services/session';

const tabItemContainerStyle = {
    background: '#eeeeee',
    color: '#07051d'
};

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            data: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let el = event.target,
            oldData = Object.assign({},this.state.data);
        oldData[el.name] = el.value;

        this.setState({
            data: oldData
        });
    }

    handleSubmit(action, prefix) {
        let login = this.state.data[prefix+'login'],
            password = this.state.data[prefix+'password'];

        if (!login) return this.setState({[prefix+'error']: 'You didn\'t enter login'});
        else if (!password) return this.setState({[prefix+'error']: 'You didn\'t enter password'});
        else if (password && password.length < 5) return this.setState({[prefix+'error']: 'Password should be more 5 letters'});
        else {session.authorize({action, login, password },(err) => {
            this.setState({[prefix+'error']: err});
        })}
    }

    render() {
        return (
            <div className="sign-in">
                <Tabs
                    tabItemContainerStyle={tabItemContainerStyle}
                    inkBarStyle={{backgroundColor: '#00bcd4'}}
                >
                    <Tab label="Login" value="a" className="tabs">
                        <div className="input-wrapper">
                            <form>
                                <div>
                                    <TextField
                                        hintText=""
                                        floatingLabelText="Login"
                                        floatingLabelFixed={true}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        name="log-login"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        hintText=""
                                        floatingLabelText="Password"
                                        floatingLabelFixed={true}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        name="log-password"
                                    />
                                </div>
                                <div className="btn-submit">
                                    <RaisedButton
                                        label="Login"
                                        backgroundColor="#00bcd4"
                                        labelColor="#FFFFFF"
                                        onClick={this.handleSubmit.bind(null,"user_login","log-")}
                                    />
                                </div>
                                <div className="error">{this.state['log-error'] ? this.state['log-error'] : ''}</div>
                            </form>
                        </div>
                    </Tab>
                    <Tab label="Registration" value="b" className="tabs">
                        <div className="input-wrapper">
                            <form>
                                <div>
                                    <TextField
                                        hintText=""
                                        floatingLabelText="Login"
                                        floatingLabelFixed={true}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        name="reg-login"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        hintText=""
                                        floatingLabelText="Password"
                                        floatingLabelFixed={true}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        name="reg-password"
                                    />
                                </div>
                                <div className="btn-submit">
                                    <RaisedButton
                                        label="Registration"
                                        backgroundColor="#00bcd4"
                                        labelColor="#FFFFFF"
                                        onClick={this.handleSubmit.bind(null,"new_user","reg-")}
                                    />
                                </div>
                                <div className="error">{this.state['reg-error'] ? this.state['reg-error'] : ''}</div>
                            </form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default LoginPage;