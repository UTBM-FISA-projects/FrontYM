import React from 'react';

import AvailableTimes from 'react-available-times';
import { Card, Container } from 'react-bootstrap';

import { Navbar } from '../../components';
import { theme } from '../../utils';

const Availability = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Card className="mb-5" style={{ boxShadow: `0 0 12px ${theme.secondaryDark}` }}>
                    <Card.Body>
                        <Card.Title as="h2" style={{ color: theme.primaryDark }}><u><strong>Disponibilités</strong></u></Card.Title>
                        <Card.Subtitle className="text-muted">
                            Remplissez les disponibilités de votre entreprise.
                        </Card.Subtitle>
                        <AvailableTimes
                            weekStartsOn="monday"
                            onChange={(selections) => {
                                selections.forEach(({ start, end }) => {
                                    console.log('Start:', start, 'End:', end);
                                });
                            }}
                        />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Availability;
