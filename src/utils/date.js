/**
 * Namespace de fonctions utiles sur les dates.
 */
const date = {
    /**
     * Formate une date en abrégé format français (jj/mm/aaaa).
     * @param dateStr {string|Date} Une date
     * @return {string}
     */
    short: (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    },

    /**
     * Formate une date en français (Lundi 1 janvier 1970).
     * @param dateStr {string|Date} Une date
     * @returns {string}
     */
    long: (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    },

    /**
     * Formate une date en jour de la semaine en français.
     * @param dateStr {string|Date} Une date
     * @return {string}
     */
    weekday: (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
            weekday: 'short',
        });
    },

    /**
     * Formate une date en mois année français (Janvier 1970).
     * @param dateStr {string|Date}
     * @return {string}
     */
    month: (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
            month: 'long',
            year: 'numeric',
        });
    },
};

export default date;
