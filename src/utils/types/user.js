import PropTypes from 'prop-types';

const userShape = {
    id_user: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf(['project_owner', 'enterprise', 'supervisor']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    id_enterprise: PropTypes.number,
};

export default userShape;
