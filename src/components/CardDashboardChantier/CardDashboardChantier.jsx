import React from 'react';
import { Badge, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import { theme } from '../../utils';
import PropTypes from 'prop-types';

const progress = 60;

const CardDashboardChantier = ({ userTypes }) => (
    <Card>
        <Card.Body>
            <Row className="text-start">
                <Col style={{ borderRight: '1px #c2c2c2 solid' }}>
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
                </Col>
                <Col>
                    <h5>{userTypes !== 'prestataire' ? 'Mission en cours' : 'Missions assignées'}</h5>
                    <Card style={{ boxShadow: `0 0 2px ${theme.primaryLight}` }}>
                        <Card.Body>
                            <Card.Title>Électricité</Card.Title>
                            <Card.Text>Mettre aux normes l'entièreté des bâtiments</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div style={{
                top: '2%',
                right: '0.5%',
                position: 'absolute',
            }}><ThreeDotsVertical /></div>
        </Card.Body>
    </Card>
);

CardDashboardChantier.propTypes = {
    userTypes: PropTypes.string,
};

export default CardDashboardChantier;
