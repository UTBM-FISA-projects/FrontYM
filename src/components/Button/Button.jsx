import React from 'react';

import { Button as BsButton, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Button = (props) => {
    const {
        loading,
        children,
        ...rest
    } = props;

    return (
        <BsButton
            disabled={loading}
            children={loading ? <Spinner animation="border" size="sm"/> : children}
            {...rest}
        />
    );
};

Button.propTypes = {
    loading: PropTypes.bool,
};

Button.defaultProps = {
    loading: false,
};

export default Button;
