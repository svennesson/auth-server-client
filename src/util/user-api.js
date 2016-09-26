'use strict';

import Api from './api';
import Auth from './auth';

let baseUrl = 'http://authserver-svennesson.boxfuse.io:8080/api/users',
    contentType = 'application/json';

export default {
    login(email, password) {
        return new Api(baseUrl)
            .path('login')
            .header('Accept', contentType)
            .header('Content-Type', contentType)
            .post({ email, password })
            .then(res => {
                const { token } = res
                Auth.setToken(token)
            })
    },

    create(user) {
        return new Api(baseUrl)
            .path('register')
            .header('Accept', contentType)
            .header('Content-Type', contentType)
            .post(user);
    },

    getTimestamps() {
        return new Api(baseUrl)
            .path('attempts')
            .path('success')
            .header('Accept', contentType)
            .header('Content-Type', contentType)
            .header('Authorization', Auth.get())
            .get();
    }
}
