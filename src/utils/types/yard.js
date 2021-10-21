import PropTypes from 'prop-types';
import userShape from './user';

const yardShape = {
    id_yard: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    deadline: PropTypes.string,
    archived: PropTypes.bool,
    supervisor: PropTypes.shape(userShape),
    project_owner: PropTypes.shape(userShape).isRequired,
};

export default yardShape;
