import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

// Regex compilés
const allowedChars = new RegExp(/\d/);
const tensMinutes = new RegExp(/[0-5]/);

const TimeInput = (props) => {
    const {
        label,
        name,
        size,
        onChange,
        className,
        invalid,
        value: valueProps,
        readOnly,
    } = props;

    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (valueProps) {
            setValue(valueProps);
        }
    }, [valueProps]);

    const handleChange = React.useCallback((event) => {
        const { target: { value } } = event;

        let colonFound = false;
        let afterColon = 0;

        const validateLetter = (letter) => {
            // si c'est : et qu'il n'y en a pas d'autre -> OK
            if (letter === ':' && !colonFound) {
                colonFound = true;
                return true;
                // si c'est un nombre ...
            } else if (allowedChars.exec(letter) !== null) {
                // ... avant ...
                if (!colonFound) {
                    return true;
                    // ... des minutes -> OK
                } else if (afterColon === 1) {
                    ++afterColon;
                    return true;
                    // ... des dizaine de minute entre 0 et 5 -> OK
                } else if (afterColon === 0 && tensMinutes.exec(letter) !== null) {
                    ++afterColon;
                    return true;
                }
            }
            return false;
        };

        if (value.split('').every(validateLetter)) {
            setValue(value);
            if (onChange) {
                onChange({
                    target: { name, value },
                });
            }
        }
    }, [name, onChange]);

    return (
        <Form.Group className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder="HH:MM"
                name={name}
                size={size}
                type="text"
                value={value}
                onChange={handleChange}
                isInvalid={invalid}
                readOnly={readOnly}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer une valeur de la forme HH:MM.
            </Form.Control.Feedback>
        </Form.Group>
    );
};

TimeInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'sm']),
    onChange: PropTypes.func,
    className: PropTypes.string,
    invalid: PropTypes.bool,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
};

export default TimeInput;
