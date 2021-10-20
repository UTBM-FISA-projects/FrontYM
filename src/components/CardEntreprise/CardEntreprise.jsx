import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Building } from 'react-bootstrap-icons';

const CardEntreprise = () => (
    <Card>
        <Card.Body>
            <Row>
                <Col className="md-auto">
                    <Card.Title className="mb-4">Obrecht charpentier</Card.Title>
                    <Building size="10em" className="mb-3" />
                </Col>
                <Col className="md-auto">
                    <Card.Subtitle className="mb-4">Description</Card.Subtitle>
                    <Card.Text>Charpentier de père en fils depuis la guerre franco-prussienne</Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
);
export default CardEntreprise;
