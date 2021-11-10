import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, FloatingLabel, Form, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { DateRangeInput } from '@datepicker-react/styled';

import { TimeInput } from '../../components';

import { date, request, theme } from '../../utils';

const timeRegex = new RegExp(/\d{2,}:[0-5]\d/);

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

const ModalNewTask = ({ show, onClose, id_yard }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [enterprises, setEnterprises] = React.useState([]);
    const [errors, setErrors] = React.useState({});
    const [data, setData] = React.useState({
        title: '',
        description: null,
        state: 'todo',
        estimated_time: null,
        start_planned_date: null,
        end_planned_date: null,
        id_executor: null,
        id_yard,
    });

    React.useEffect(() => {
        request.get('/api/users/enterprises', {
            start_date: data.start_planned_date ? data.start_planned_date.toJSON() : '',
            end_date: data.end_planned_date ? data.end_planned_date.toJSON() : '',
            hours: data.estimated_time ?? '',
        })
            .then(r => {setEnterprises(r.data);})
            .catch(() => {});
    }, [data.estimated_time, data.start_planned_date, data.end_planned_date]);

    const handleSubmit = React.useCallback(() => {
        if (data.estimated_time && !timeRegex.test(data.estimated_time)) {
            setErrors({ estimated_time: true });
            return;
        }

        request.post('/api/tasks', data).then(onClose);
    }, [data, onClose]);

    const handleDateChange = React.useCallback((data) => {
        setData(prevState => ({
            ...prevState,
            start_planned_date: data.startDate,
            end_planned_date: data.endDate,
        }));
        dispatch({ type: 'dateChange', payload: data });
    }, []);

    const handleChange = React.useCallback(({ target: { name, value } }) => {
        setData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleQuillChange = React.useCallback((value) => {
        setData(prevState => ({
            ...prevState,
            description: value,
        }));
    }, []);

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
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
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <ReactQuill className="mb-5" value={data.description} onChange={handleQuillChange} />
                <label>Période estimée</label>
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
                    onDatesChange={handleDateChange}
                    onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
                    startDate={data.start_planned_date}
                    endDate={data.end_planned_date}
                    focusedInput={state.focusedInput}
                />
                <TimeInput
                    label="Temps estimé"
                    className="mb-5"
                    name="estimated_time"
                    onChange={handleChange}
                    invalid={errors.estimated_time}
                />
                <Card.Text className="mb-3">Entreprise assignée à la mission</Card.Text>
                <Form.Select name="id_executor" className="mb-3" onChange={handleChange}>
                    <option>Aucun prestataire</option>
                    {enterprises.map((ent) => (
                        <option key={ent.id_user} value={ent.id_user}>{ent.name}</option>
                    ))}
                </Form.Select>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={onClose} className="me-3">Annuler</Button>
                    <Button variant="success" onClick={handleSubmit}>Ajouter</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalNewTask.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    id_yard: PropTypes.number.isRequired,
};

export default ModalNewTask;
