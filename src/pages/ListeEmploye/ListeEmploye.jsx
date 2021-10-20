import React from 'react';
import { Navbar } from '../../components';
import { Card, Container, Table } from 'react-bootstrap';
import { theme } from '../../utils';

const ListeEmploye = () => (
    <>
        <Navbar />
        <Container>
            <Card>
                <Card.Title as="h2" className="text-center mb-4" style={{ color: theme.primaryDark }}>
                    <u><strong>Employés</strong></u>
                </Card.Title>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Mot de passe</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Jean</td>
                            <td>Jean.Mark@lamerde.com</td>
                            <td>06 95 63 41 12</td>
                            <td>Mdjhfhqgké-çfayç</td>
                            <td>Électrichien</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    </>
);

export default ListeEmploye;
