import fetch from 'isomorphic-fetch';
import slug from 'slug';
import React from 'react';

export function fetchJson(url) {
    return fetch(url, {
        credentials: 'include'
    })
    .then(
        res => res.ok ? res.json() : Promise.reject(new Error(`failed to fetch ${url}: ${res.status} ${res.statusText}`))
    );
}

export function fetchHdoApi(apiPath) {
    return fetch(`https://data.holderdeord.no/api/${apiPath}`, {
        credentials: 'include'
    })
    .then(
        res => res.ok ? res.json() : Promise.reject(new Error(`failed to fetch ${url}: ${res.status} ${res.statusText}`))
    );
}

export function slugify(str) {
    return slug(str, {lower: true});
}

export function renderText(str) {
    if (str.match(/^<span/)) {
        return <span dangerouslySetInnerHTML={{__html: str}} />
    } else {
        return str;
    }
}

export function trackPageView() {
    if (process.env.NODE_ENV === 'production' && window.ga) {
        window.ga('create', 'UA-19569290-9', 'auto');
        window.ga('set', 'anonymizeIp', true);
        window.ga('send', 'pageview');
    } else {
        console.log('Not tracking page view in development mode.');
    }
}