import { generateFetch } from './common';
import $ from 'jquery';

const _admin = {
    initDashboard(callback) {
        let init = generateFetch();
        init['data'] = {
          action: 'get_images'
        };

        $.ajax(init).done(data => {
            if (data) {
                let _data = JSON.parse(data);
                if (_data.images && typeof callback === 'function') callback(_data.images);
            }
        });
    },

    uploadItems(files, callback) {
        if (files.length !== 0) {
            let fd = new FormData(),
                x = 0,
                init = generateFetch();
            fd.append('action', 'add_images');

            for (x; x < files.length; x++) {
                fd.append("uploads[]", files[x]);
            }

            init['data'] = fd;
            init['processData'] = false;
            init['contentType'] = false;

            $.ajax(init).done(data =>{
                if (data) {
                    console.log(data);
                    let _data = JSON.parse(data);
                    if (_data.images && typeof callback === 'function') callback(_data.images);
                }
            });
        }
    },

    updateData(id, description) {
        if (arguments.length !== 0) {
            let init = generateFetch({
                action: 'update_images',
                id: id,
                data: {
                    description: description
                }
            });

            $.ajax(init).done(data => {});
        }
    },

    removeImage(id) {
        if (id) {
            let init = generateFetch({
                action: 'remove_image',
                id
            });

            $.ajax(init).done(data => {});
        }
    },

    getUsers(callback) {
        let init = generateFetch({
            action: 'get_users',
        });

        $.ajax(init).done(data => {
            if (typeof callback === 'function') callback(JSON.parse(data))
        });
    },

    changeRole(id, role, callback) {
        let init = generateFetch({
            action: 'change_role',
            id, role
        });

        $.ajax(init).done(data => {});
    }
};

export default _admin;


