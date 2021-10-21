/**
 * Détermine si la valeur donnée est un ID valide.
 *
 * @param id {any} valeur à tester
 * @returns {boolean} vrai si la valeur est un ID, false sinon
 */
const isValidId = (id) => {
    return Number.isInteger(id) && id > 0;
};

export default isValidId;
