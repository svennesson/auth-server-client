'use strict';

class Auth {
    constructor(storageKey = 'auth-server') {
        this.authKey = `${storageKey}:token:auth`;
        this.transition = null;
        try {
            this.auth = localStorage.getItem(this.authKey);
        } catch (e) {
            console.warn(e)
            this.auth = null;
        }
    }

    get() {
        return this.auth;
    }

    setToken (token) {
        this.auth = `Bearer ${token}`
        try {
            localStorage.setItem(this.authKey, this.auth)
        } catch (e) {
            console.warn(e)
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.authKey);
        } catch (e) {
            console.warn(e)
        }

        this.auth = null;
    }

    getTransition() {
        return this.transition;
    }

    setTransition(t) {
        this.transition = t;
    }
}

export default new Auth();
