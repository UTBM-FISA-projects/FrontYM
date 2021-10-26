import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const allowedChars = new RegExp(/\d/);

const TimeInput = (props) => {
    const {
        label,
        name,
        size,
        onChange,
        className,
    } = props;

    const [value, setValue] = React.useState('');

    const handleChange = React.useCallback((e) => {
        const { target: { value } } = e;

        let colonFound = false;
        let afterColon = 0;

        const validateLetter = (letter) => {
            if (letter === ':' && !colonFound) {
                colonFound = true;
                return true;
            } else if (allowedChars.exec(letter) !== null) {
                if (afterColon < 2) {
                    if (colonFound) ++afterColon;
                    return true;
                }
            }
            return false;
        };

        if (value.split('').every(validateLetter)) {
            setValue(value);
        }

        if (onChange) {
            onChange(e);
        }
    }, [onChange]);

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder="00:00"
                name={name}
                size={size}
                type="text"
                value={value}
                onChange={handleChange}
                className={className}
            />
        </Form.Group>
    );
};

TimeInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'sm']),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default TimeInput;
