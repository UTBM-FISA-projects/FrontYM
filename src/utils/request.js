import typeCheck from './typeCheck';

/**
 * Envoie une requête et renvoie le JSON de retour dans une promesse.
 * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
 *
 * @param method {string}
 * @param url {string} URL de la requête
 * @param body {Object|FormData} JSON a envoyer
 * @param params {Object}
 * @returns {Promise<Object>|null} Promesse contenant le JSON de réponse
 */
const send = (method, url, body = null, params = {}) => {
    const data = typeCheck(body, FormData) ? Object.fromEntries(body) : body;

    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: data ? JSON.stringify(data) : null,
        ...params,
    })
        .then(res => {
            switch (res.status) {
                case 401:
                    window.location = '/connexion';
                    break;
                case 422:
                    return Promise.reject(res);
                default:
                    return method === 'DELETE' ? null : res.json();
            }
        });
};

/**
 * Collection de fonctions de permettant d'envoyer des requête AJAX
 * tout en vérifiant l'authentification.
 */
const request = {
    /**
     * Envoie une requête GET et retourne le JSON dans une promesse.
     * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
     *
     * @param url {string}
     * @param params {Object?}
     * @returns {Promise<Object>}
     */
    get: (url, params) => {
        let full_url = url;
        if (params) {
            full_url += '?' + (new URLSearchParams(params)).toString();
        }
        return send('GET', full_url);
    },

    /**
     * Envoie une requête POST et retourne le JSON dans une promesse.
     * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
     *
     * @param url {string} URL de la requête
     * @param body {Object|FormData} JSON a envoyer
     * @returns {Promise<Object>} Promesse contenant le JSON de réponse
     */
    post: (url, body) => send('POST', url, body),

    /**
     * Envoie une requête PUT et retourne le JSON dans une promesse.
     * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
     *
     * @param url {string} URL de la requête
     * @param body {Object|FormData} JSON a envoyer
     * @returns {Promise<Object>} Promesse contenant le JSON de réponse
     */
    put: (url, body) => send('PUT', url, body),

    /**
     * Envoie une requête GET et retourne le JSON dans une promesse.
     * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
     *
     * @param url {string}
     * @returns {Promise<Object>}
     */
    delete: (url) => send('DELETE', url),
};

export default request;
