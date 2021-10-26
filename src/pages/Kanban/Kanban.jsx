import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { TaskList } from '../../components/TaskList';
import ModalNewTask from './ModalNewTask';

import { theme } from '../../utils';

const colors = {
    secondaryBlue: '#3399ff',
    transparentBlue: '#cce6ff',
    secondaryGreen: '#1e7b1e',
    transparentGreen: '#98e698',
    transparentYellow: '#fbf99d',
};

const Kanban = ({ id_yard }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ borderColor: colors.secondaryBlue }}>
                        <Card.Header
                            as="h2"
                            className="text-center mb-4"
                            style={{
                                color: colors.secondaryBlue,
                                borderColor: colors.secondaryBlue,
                                backgroundColor: colors.transparentBlue,
                            }}
                        >
                            À faire
                        </Card.Header>
                        <TaskList id_yard={id_yard} state="done" />
                        <Card.Body>
                            <div className="d-flex justify-content-end">
                                <Button variant="success" onClick={handleShow}>Ajouter Mission</Button>
                            </div>
                            <ModalNewTask show={show} onClose={handleClose} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ borderColor: theme.primaryDark }}>
                        <Card.Header
                            as="h2"
                            className="text-center mb-4"
                            style={{
                                color: theme.primaryDark,
                                backgroundColor: colors.transparentYellow,
                                borderColor: theme.primaryDark,
                            }}
                        >
                            En cours
                        </Card.Header>
                        <Card.Body>
                            <TaskList id_yard={id_yard} state="doing" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ borderColor: colors.secondaryGreen }}>
                        <Card.Header
                            as="h2"
                            className="text-center mb-4"
                            style={{
                                color: colors.secondaryGreen,
                                borderColor: colors.secondaryGreen,
                                backgroundColor: colors.transparentGreen,
                            }}
                        >
                            Fait
                        </Card.Header>
                        <Card.Body>
                            <TaskList id_yard={id_yard} state="done" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

Kanban.propTypes = {
    id_yard: PropTypes.number.isRequired,
};

export default Kanban;
