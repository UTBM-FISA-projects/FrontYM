import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { theme } from '../../utils';

const colors = {
    secondaryBlue: '#3399ff',
    transparentBlue: '#cce6ff',
    secondaryGreen: '#1e7b1e',
    transparentGreen: '#98e698',
    transparentYellow: '#fbf99d',
};

const Kanban = () => (
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
                    <Card.Body>
                        <div className="d-flex justify-content-end">
                            <Button variant="success">Ajouter une tâche</Button>
                        </div>
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

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default Kanban;
