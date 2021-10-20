import React, { useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, FormControl, Modal, Row } from 'react-bootstrap';
import { Navbar } from '../../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { theme } from '../../utils';
import { PlusSquare } from 'react-bootstrap-icons';

const NouveauChantier = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                        <PlusSquare size="4em" className="my-2" onClick={handleShow} />
                                        <>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Body>
                                                    <FormControl
                                                        placeholder="Rechercher"
                                                        aria-label="Rechercher"
                                                        aria-describedby="basic-addon1"
                                                        className="mb-4 text-center"
                                                    />
                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="danger"
                                                                onClick={handleClose}
                                                                style={{ marginRight: '1em' }}>
                                                            Annuler
                                                        </Button>
                                                        <Button variant="success" onClick={handleClose}>
                                                            Ajouter
                                                        </Button>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Button variant="danger" style={{ marginRight: '1em' }}>Annuler</Button>
                            <Button variant="success">Créer</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
        ;
};

export default NouveauChantier;
