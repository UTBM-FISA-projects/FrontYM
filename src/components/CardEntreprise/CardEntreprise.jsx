import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col, Row } from 'react-bootstrap';
import { Building, Check2Circle } from 'react-bootstrap-icons';

import { userShape } from '../../utils';

const CardEntreprise = ({ selected, enterprise }) => (
    <Card style={{ height: '100%' }}>
        <Card.Body>
            {selected && (
                <Check2Circle size="2em" color="green" style={{ position: 'absolute', top: '1em', right: '1em' }} />
            )}
            <Card.Title className="mb-4">{enterprise.name}</Card.Title>
            <Row>
                <Col sm={4}>
                    <Building size="7em" className="mb-3" />
                </Col>
                <Col sm={8}>
                    <Card.Subtitle className="text-muted mb-2">Description</Card.Subtitle>
                    <Card.Text>{enterprise.description}</Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
);

CardEntreprise.propTypes = {
    selected: PropTypes.bool,
    enterprise: PropTypes.shape(userShape).isRequired,
};

CardEntreprise.defaultProps = {
    selected: false,
};

export default CardEntreprise;
