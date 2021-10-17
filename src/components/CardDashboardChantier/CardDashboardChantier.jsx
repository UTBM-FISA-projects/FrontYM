import React from 'react';
import { Badge, Card, ProgressBar } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import { theme } from '../../utils';
import PropTypes from 'prop-types';

const progress = 60;

const CardDashboardChantier = ({ userTypes }) => (
    <Card>
        <Card.Body>
            <div className="container">
                <div className="row">
                    <div className="col-sm text-start">
                        <h5>{userTypes !== 'prestataire' ? 'Chantier 1 Raedersheim' : 'Prestation sur chantier 8 Illkirch-Graffenstanden'}</h5>
                        {userTypes !== 'prestataire' && (
                            <div className="mt-4">
                                <h5>Progression générale</h5>
                                <p>Progression du chantier</p>
                                <ProgressBar now={progress} label={`${progress}%`} />
                                <Badge bg="light" text="dark" className="mt-3">Temps de travail 0h/800h</Badge>
                            </div>
                        )}
                        {userTypes === 'prestataire' && (
                            <div className="mt-4">
                                <h5>Prochaine intervention</h5>
                                <Badge bg="light" text="dark" className="mt-3">Mercredi 27 octobre 2021 à 13h</Badge>
                            </div>
                        )}
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
                        <h5>{userTypes !== 'prestataire' ? 'Mission en cours' : 'Missions assignées'}</h5>
                        <Card style={{ boxShadow: `0 0 2px ${theme.primaryLight}` }}>
                            <Card.Body>
                                <Card.Title>Électricité</Card.Title>
                                <Card.Text>Mettre aux normes l'entièreté des bâtiments</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-auto">
                        <ThreeDotsVertical className="position-absolute text-top-right" />
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
);

CardDashboardChantier.propTypes = {
    userTypes: PropTypes.string,
};

export default CardDashboardChantier;
