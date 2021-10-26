import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, FloatingLabel, Form, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { DateRangeInput } from '@datepicker-react/styled';

import { date, theme } from '../../utils';

const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'focusChange':
            return { ...state, focusedInput: action.payload };
        case 'dateChange':
            return action.payload;
        default:
            throw new Error();
    }
}

const ModalNewTask = ({ show, onClose }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Body>
                <h2 style={{ color: theme.primaryDark }} className="mb-4">
                    <strong>Nouvelle mission</strong>
                </h2>
                <FloatingLabel label="Nom de la mission" className="mb-4">
                    <Form.Control
                        required
                        placeholder="Nom de la mission"
                        size="lg"
                        type="text"
                    />
                </FloatingLabel>
                <ReactQuill theme="snow" className="mb-5" />
                <label>Période estimée</label>
                <div id="date-range" style={{ zIndex: 10, position: 'relative' }}>
                    <DateRangeInput
                        showSelectedDates={false}
                        showClose={false}
                        displayFormat="dd/MM/yyyy"
                        weekdayLabelFormat={date.weekday}
                        monthLabelFormat={date.month}
                        phrases={{
                            startDatePlaceholder: 'Début',
                            endDatePlaceholder: 'Fin',
                            close: 'Fermer',
                            resetDates: 'Remettre à zéro',
                        }}
                        onDatesChange={data => dispatch({ type: 'dateChange', payload: data })}
                        onFocusChange={focusedInput => dispatch({
                            type: 'focusChange',
                            payload: focusedInput,
                        })}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        focusedInput={state.focusedInput}
                    />
                </div>
                <FloatingLabel label="Temps estimé" className="mt-3 mb-5">
                    <Form.Control placeholder="Temps estimé" size="lg" type="text" />
                </FloatingLabel>
                <Card.Text className="mb-3">Entreprise assignée à la mission</Card.Text>
                <Form.Select aria-label="Entreprise assignée" className="mb-3">
                    <option>Entreprise assignée</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Viva l'algérie !</option>
                </Form.Select>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={onClose} className="me-3">Annuler</Button>
                    <Button variant="success" onClick={onClose}>Ajouter</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalNewTask.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default ModalNewTask;
