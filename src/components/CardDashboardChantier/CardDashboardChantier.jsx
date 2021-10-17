import React from 'react';
import { Badge, Card, Container, ProgressBar } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import { theme } from '../../utils';

const progress = 60;

const CardDashboardChantier = () => (
    <Container className="text-center">
        <Card>
            <Card.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-sm text-start">
                            <h4>Chantier 1 Raedersheim</h4>
                            <div className="mt-4">
                                <h5>Progression générale</h5>
                                <p>Progression du chantier</p>
                                <ProgressBar now={progress} label={`${progress}%`} />
                                <Badge bg="light" text="dark" className="mt-3">Temps de travail 0h/800h</Badge>
                            </div>
                            <div className="mt-4">
                                <h5>Responsable</h5>
                                <p>Jean-Phillipe BTP</p>
                                <Badge bg="light" text="dark">Conducteur de travaux Jean-Phillipe</Badge>
                            </div>
                        </div>
                        <div className="col-1">
                            <hr style={{ color: 'secondaryDark', width: 1, height: 250 }} />
                        </div>
                        <div className="col-sm text-start mt-3">
                            <h5>Mission en cours</h5>
                            <Card style={{ boxShadow: `0 0 2px ${theme.primaryLight}` }}>
                                <Card.Body>
                                    <Card.Title>Électricité</Card.Title>
                                    <Card.Text>Mettre aux normes l'entièreté des bâtiments</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-auto">
                            <ThreeDotsVertical className="position-fixed text-top-right" />
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Container>
);

export default CardDashboardChantier;
