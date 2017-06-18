import store from '../dispatcher/reducers';
import { generateFetch } from './common';
import $ from 'jquery';

const User = {

    isLoggedIn() {
        let _user = store.getState().user;

        if (_user && _user.length !== 0) return _user[_user.length-1].user.logged;
        else return false;
    },

    getUser() {
        let _user = store.getState().user;
        if (_user && _user.length !== 0) return _user[_user.length-1].user;
        else return {logged: false, role: 'guest'}
    },

    initUser(callback) {
        let init = generateFetch({
            'action': 'user_check'
        });

        $.ajax(init).done(function(data){
            if (data) {
                let _data = JSON.parse(data);

                if (data.error && typeof callback === 'function') callback(_data.error);
                if (_data.user) {
                    _data.user.logged = true ;
                    store.dispatch({ type: 'USER', user: _data.user });
                } else {
                    store.dispatch({ type: 'USER', user: {logged: false, role: 'guest'} });
                }
            }
        });
    },

    initUserInStore(callback) {
        store.subscribe(() => {
            let user = store.getState().user;
            if (user.length !== 0 && user[user.length-1].user) {
                callback({user: user[user.length-1].user});
                // return user;
            }
        });
    },

    initGallery(callback) {
        let init = generateFetch({
            'action': 'get_images'
        });

        $.ajax(init).done(data => {
            if (data && typeof callback === 'function') callback(JSON.parse(data));
        })
    },

    logout() {
        let init = generateFetch({
            'action': 'user_logout'
        });

        $.ajax(init).done(function(data){
            if (data) {
                let _data = JSON.parse(data);
                if (_data.user) {
                    _data.user.logged = false ;
                    store.dispatch({ type: 'USER', user: _data.user });
                }
            }
        });
    }
};

export default User;