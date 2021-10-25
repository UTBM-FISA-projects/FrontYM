import React, { useReducer, useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { theme } from '../../utils';
import ReactQuill from 'react-quill';
import { DateRangeInput } from '@datepicker-react/styled';

const colors = {
    secondaryBlue: '#3399ff',
    transparentBlue: '#cce6ff',
    secondaryGreen: '#1e7b1e',
    transparentGreen: '#98e698',
    transparentYellow: '#fbf99d',
};

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

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DateRangeInput
            onDatesChange={data => dispatch({ type: 'dateChange', payload: data })}
            onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
            startDate={state.startDate} // Date or null
            endDate={state.endDate} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
        />
    );
};

const Kanban = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ borderColor: colors.secondaryBlue }}>
                        <Card.Header as="h2"
                                     className="text-center mb-4"
                                     style={{
                                         color: colors.secondaryBlue,
                                         borderColor: colors.secondaryBlue,
                                         backgroundColor: colors.transparentBlue,
                                     }}>
                            À faire
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-end">
                                <Button variant="success" onClick={handleShow}>Ajouter Mission</Button>
                            </div>
                            <>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Body>
                                        <h2 style={{ color: theme.primaryDark }} className="mb-4">
                                            <strong>Nouvelle mission</strong>
                                        </h2>
                                        <FloatingLabel label="Nom de la mission" className="mb-4">
                                            <Form.Control required
                                                          placeholder="Nom de la mission"
                                                          size="lg"
                                                          type="text" />
                                        </FloatingLabel>
                                        <ReactQuill theme="snow" className="mb-4" />
                                        <Card.Text className="mb-3">Période estimée</Card.Text>
                                        {
                                            App()
                                        }
                                        <FloatingLabel label="Temps estimé" className="mt-3 mb-4">
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
                                            <Button variant="danger"
                                                    onClick={handleClose}
                                                    style={{ marginRight: '1em' }}>
                                                Annuler
                                            </Button>
                                            <Button variant="success" onClick={handleClose}>
                                                Ajouter
                                            </Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ borderColor: theme.primaryDark }}>
                        <Card.Header as="h2"
                                     className="text-center mb-4"
                                     style={{
                                         color: theme.primaryDark,
                                         backgroundColor: colors.transparentYellow,
                                         borderColor: theme.primaryDark,
                                     }}>
                            En cours
                        </Card.Header>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ borderColor: colors.secondaryGreen }}>
                        <Card.Header as="h2"
                                     className="text-center mb-4"
                                     style={{
                                         color: colors.secondaryGreen,
                                         borderColor: colors.secondaryGreen,
                                         backgroundColor: colors.transparentGreen,
                                     }}>
                            Fait
                        </Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Kanban;
