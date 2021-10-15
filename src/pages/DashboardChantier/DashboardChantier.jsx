import React from 'react';

import { Card, Container, Stack } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { Navbar } from '../../components';

const DashboardChantier = () => (
    <>
        <Navbar />
        <Container className="text-center">
            <Stack gap={4}>
                <Card>
                    <Card.Body>
                        <h1>Vos chantiers</h1>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <PlusSquare size="4em" />
                    </Card.Body>
                </Card>
            </Stack>
        </Container>
    </>
);

export default DashboardChantier;
