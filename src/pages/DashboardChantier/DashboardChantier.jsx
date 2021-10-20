import React from 'react';

import { Card, Container, Stack } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const DashboardChantier = () => (
    <Container className="text-center">
        <Stack gap={4}>
            <Card>
                <Card.Body>
                    <h1>Vos chantiers</h1>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Link to="/chantiers/nouveau">
                        <PlusSquare size="4em" />
                    </Link>
                </Card.Body>
            </Card>
        </Stack>
    </Container>
);

export default DashboardChantier;
