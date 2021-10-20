import React from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Navbar } from '../../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PlusSquare } from 'react-bootstrap-icons';
import { theme } from '../../utils';
import { Link } from 'react-router-dom';

const NouveauChantier = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title as="h2" style={{ color: theme.primaryDark }} className="mb-4">
                            <u>
                                <strong>Nouveau chantier</strong>
                            </u>
                        </Card.Title>
                        <FloatingLabel label="Nom du chantier" className="mb-4">
                            <Form.Control required placeholder="Nom du chantier" size="lg" type="text" />
                        </FloatingLabel>
                        <ReactQuill theme="snow" className="mb-4" />
                        <FloatingLabel label="date de fin" className="mb-4">
                            <Form.Control required placeholder="date de fin" size="lg" type="date" />
                        </FloatingLabel>
                        <Card.Subtitle as="h4" className="mb-4">Entreprises</Card.Subtitle>
                        <Row sm={4}>
                            <Col>
                                <Card className="mb-4">
                                    <Card.Body className="text-center">
                                        <PlusSquare size="4em" className="my-2" />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Button as={Link} to="/chantiers" variant="danger" className="me-3" children="Annuler" />
                            <Button variant="success">Créer</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default NouveauChantier;
