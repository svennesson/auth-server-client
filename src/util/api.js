'use strict';

import trim, { trimRight } from './trim';

class Api {
    constructor(url) {
        if (null == url) {
            throw new Error('URL cannot be null');
        }

        this.url = url;
        this.headers = {};
        this.urlParts = [];
        this.queryParams = {};
    }

    path(part) {
        this.urlParts.push(part);
        return this;
    }

    queryParam (key, val) {
        if (null == this.queryParams[key]) {
            this.queryParams[key] = []
        }
        this.queryParams[key].push(val)

        return this;
    }

    header(header, value) {
        if (null == this.headers[header]) {
            this.headers[header] = [];
        }
        this.headers[header].push(value);

        return this;
    }

    accept(value) {
        return this.header('Accept', value);
    }

    type(value) {
        return this.header('Content-Type', value);
    }

    get() {
        return this._request('get');
    }

    post(data, isJson) {
        return this._request('post', data, isJson);
    }

    put(data, isJson) {
        return this._request('put', data, isJson);
    }

    delete(data) {
        return this._request('delete', data);
    }

    _request(method, data, isJson = true) {
        return fetch(this._getUrl(), {
            method,
            headers: this._getHeaders(),
            body: null != data ? isJson ? JSON.stringify(data) : data : undefined // FF treats `null` as body
        })
        .then(this._status)
        .then(this._parse);
    }

    _getUrl() {
        const parts = this.urlParts.filter(part => null != part)
            .map(part => part.toString())
            .map(part => trim(part, '/'))
            .join('/');
        const query = Object.keys(this.queryParams)
            .reduce((q, key) =>
                q.concat(`${encodeURIComponent(key)}=${encodeURIComponent(this.queryParams[key])}`), [])
            .join('&')

        return trim(`${this.url}/${parts}?${query}`, '\/\?');
    }

    _getHeaders() {
        let headers = {};
        Object.getOwnPropertyNames(this.headers)
            .forEach(header => headers[header] = this.headers[header].join(' '));

        return headers;
    }

    _status(res) {
        if (200 <= res.status && 300 > res.status) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    }

    _parse(res) {
        let contentTypeHeader = res.headers.get('Content-Type'),
            [ contentType ] = contentTypeHeader.split(';');
        if (contentType.endsWith('json')) {
            return res.json().catch(() => Promise.resolve(res));
        }

        return Promise.resolve(res);
    }
}

export default Api;
