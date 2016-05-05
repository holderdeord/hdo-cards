import fetch from 'isomorphic-fetch';

export function fetchJson(url) {
    return fetch(url, {
        credentials: 'include'
    })
    .then(
        res => res.ok ? res.json() : Promise.reject(new Error(`failed to fetch ${url}: ${res.status} ${res.statusText}`))
    );
}