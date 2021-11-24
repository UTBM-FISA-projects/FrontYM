import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

import { TaskList } from '../../components/TaskList';
import ModalNewTask from './ModalNewTask';

import { theme, userShape } from '../../utils';

const colors = {
    secondaryBlue: '#3399ff',
    transparentBlue: '#cce6ff',
    secondaryGreen: '#1e7b1e',
    transparentGreen: '#98e698',
    transparentYellow: '#fbf99d',
};

const Kanban = (props) => {
    const {
        id_yard,
        user,
    } = props;

    const [show, setShow] = useState(false);
    const handleClose = React.useCallback(() => {setShow(false);}, []);
    const handleShow = React.useCallback(() => {setShow(true);}, []);

    return (
        <Container>
            <Row>
                <Col className="mb-3 overflow-auto">
                    <Card style={{ borderColor: colors.secondaryBlue }}>
                        <Card.Header
                            as="h2"
                            className="text-center"
                            style={{
                                color: colors.secondaryBlue,
                                borderColor: colors.secondaryBlue,
                                backgroundColor: colors.transparentBlue,
                            }}
                        >
                            À faire{' '}
                            {user.type === 'supervisor' && <Button onClick={handleShow} size="sm"><PlusLg /></Button>}
                        </Card.Header>
                        <Card.Body className="overflow-auto">
                            <TaskList id_yard={id_yard} state="todo" user={user} />
                            <ModalNewTask id_yard={id_yard} show={show} onClose={handleClose} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3 overflow-auto">
                    <Card style={{ borderColor: theme.primaryDark }}>
                        <Card.Header
                            as="h2"
                            className="text-center"
                            style={{
                                color: theme.primaryDark,
                                backgroundColor: colors.transparentYellow,
                                borderColor: theme.primaryDark,
                            }}
                        >
                            En cours
                        </Card.Header>
                        <Card.Body>
                            <TaskList id_yard={id_yard} state="doing" user={user} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3 overflow-auto">
                    <Card style={{ borderColor: colors.secondaryGreen }}>
                        <Card.Header
                            as="h2"
                            className="text-center"
                            style={{
                                color: colors.secondaryGreen,
                                borderColor: colors.secondaryGreen,
                                backgroundColor: colors.transparentGreen,
                            }}
                        >
                            Fait
                        </Card.Header>
                        <Card.Body>
                            <TaskList id_yard={id_yard} user={user} state="done" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

Kanban.propTypes = {
    id_yard: PropTypes.number.isRequired,
    user: PropTypes.shape(userShape),
};

export default Kanban;
