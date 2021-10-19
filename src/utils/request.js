import typeCheck from './typeCheck';

/**
 * Envoie une requête et renvoie le JSON de retour dans une promesse.
 * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
 *
 * @param method {string}
 * @param url {string} URL de la requête
 * @param body {Object|FormData} JSON a envoyer
 * @param params {Object}
 * @returns {Promise<Object>} Promesse contenant le JSON de réponse
 */
const send = (method, url, body = null, params = {}) => {
    const data = typeCheck(body, FormData) ? Object.fromEntries(body) : body;

    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        ...params,
    })
        .then(res => {
            if (res.status === 401) {
                window.location = '/connexion';
            }
            return res.json();
        });
};

/**
 * Collection de fonctions de permettant d'envoyer des requête AJAX.
 *
 * @type {{
 *   post: (function(string, (Object|FormData)): Promise<Object>),
 *   get: (function(string): Promise<Object>),
 *   delete: (function(string): Promise<Object>),
 *   put: (function(string, (Object|FormData)): Promise<Object>)
 * }}
 */
const request = {
    /**
     * Envoie une requête GET et retourne le JSON dans une promesse.
     * Si la réponse est 401 Unauthorized, le client est redirigé vers la page de connexion.
     *
     * @param url {string}
     * @returns {Promise<Object>}
     */
    get: (url) => send('GET', url),

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
