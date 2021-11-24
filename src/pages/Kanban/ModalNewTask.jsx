import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { DateRangeInput } from '@datepicker-react/styled';

import { TimeInput } from '../../components';

import { date, request, theme, userShape } from '../../utils';

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

const ModalNewTask = ({ show, onClose, id_yard, task, user }) => {
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
        if (task) {
            const ntask = {
                ...task,
                start_planned_date: task.start_planned_date ? new Date(task.start_planned_date) : null,
                end_planned_date: task.end_planned_date ? new Date(task.end_planned_date) : null,
            };
            setData(ntask);
        }
    }, [task]);

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

        const ndata = data;
        if (ndata.id_executor === 'null') {
            ndata.id_executor = null;
        }

        if (task) {
            request.put(`/api/tasks/${task.id_task}`, ndata).then(onClose);
        } else {
            request.post('/api/tasks', ndata).then(onClose);
        }
    }, [data, onClose, task]);

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

    const handleCheckboxChange = React.useCallback(({ target: { name, checked } }) => {
        setData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    }, []);

    const handleQuillChange = React.useCallback((value) => {
        setData(prevState => ({
            ...prevState,
            description: value,
        }));
    }, []);

    console.log(data.start_planned_date);

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Body>
                <h2 style={{ color: theme.primaryDark }} className="mb-4">
                    {task ? (
                        <strong>Mission : {data.title}</strong>
                    ) : (
                        <strong>Nouvelle mission</strong>
                    )}
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
                <ReactQuill className="mb-4" value={data.description} onChange={handleQuillChange} />
                {task && (
                    <>
                        <label>État</label>
                        <Form.Select className="mb-4" name="state" onChange={handleChange}>
                            <option value="todo" selected={data.state === 'todo'}>À faire</option>
                            <option value="doing" selected={data.state === 'doing'}>En cours</option>
                            <option value="done" selected={data.state === 'done'}>Fait</option>
                        </Form.Select>
                        <Form.Switch
                            name="executor_validated"
                            label="Mission validée par l'exécutant"
                            checked={data.executor_validated}
                            onChange={handleCheckboxChange}
                            disabled={user.id_user !== data.id_executor}
                        />
                        <Form.Switch
                            name="supervisor_validated"
                            label="Mission validée par le superviseur"
                            onChange={handleCheckboxChange}
                            checked={data.supervisor_validated}
                            disabled={user.type !== 'supervisor'}
                        />
                    </>
                )}
                <hr style={{ color: theme.primary, height: 3 }} />
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
                    className="mb-4"
                    name="estimated_time"
                    onChange={handleChange}
                    invalid={errors.estimated_time}
                />
                <hr style={{ color: theme.primary, height: 3 }} />
                <label>Entreprise assignée à la mission</label>
                <Form.Select
                    name="id_executor"
                    className="mb-4"
                    onChange={handleChange}
                >
                    <option value="null">Aucun prestataire</option>
                    {enterprises.map((ent) => (
                        <option
                            key={ent.id_user}
                            value={ent.id_user}
                            selected={ent.id_user === data.id_executor}
                        >
                            {ent.name}
                        </option>
                    ))}
                </Form.Select>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={onClose} className="me-3">
                        {user?.type === 'project_owner' ? 'Fermer' : 'Annuler'}
                    </Button>
                    {user?.type !== 'project_owner' && (
                        <Button variant="success" onClick={handleSubmit}>Enregistrer</Button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalNewTask.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    id_yard: PropTypes.number.isRequired,
    task: PropTypes.object,
    user: PropTypes.shape(userShape),
};

ModalNewTask.propTypes = {
    task: null,
};

export default ModalNewTask;
