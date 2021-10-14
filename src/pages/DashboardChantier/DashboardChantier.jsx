import React from 'react';
import './DashboardChantier.css';
import { Card, Container } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const DashboardChantier = () => (
        <Container className="container">
            <Card className="VosChantiers">
                <Card.Body>
                    <h1>Vos chantiers</h1>
                </Card.Body>
            </Card>
            <Card className="CardChantier">
                <Card.Body>
                    <PlusSquare size="4em" />
                </Card.Body>
            </Card>
        </Container>

    )
;

export default DashboardChantier;
