import { API } from '../constants/constants';
export function generateFetch(params, data) {
    let formData = {},
        i,t,
        req = {
            method: 'POST',
            url: API.url,
            crossDomain: true,
            xhrFields: { withCredentials: true },
        };

    if (arguments.length === 0) return req;

    if (Array.isArray(data)) {
        for (i = 0; i < data.length; i++ )
        formData[params+'[]'] = data[i]
    } else if (typeof params === 'object') {
        for (i in params) {
            if (Array.isArray(params[i])) {
                for (t = 0; t < params[i].length; t++) {
                    formData[i+'[]'] = params[i][t]
                }
            } else {
                formData[i] = params[i];
            }
        }
    } else if (params, data) {
        formData[params] =  data
    }

    req.data = formData;
    return req;
}



