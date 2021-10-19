/**
 * Vérifie le type d'une variable.
 *
 * @param value Valeur à vérifier
 * @param type Type attendu de la valeur
 * @returns {boolean} true si le type attendu est correct, false sinon
 */
const typeCheck = (value, type) => {
    return Object.prototype.toString.call(value) === type.prototype.toString();
}

export default typeCheck;
