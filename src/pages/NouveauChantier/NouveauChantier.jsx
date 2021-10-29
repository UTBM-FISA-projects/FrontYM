import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';

import ModalEnterprises from './ModalEnterprises';

import { isValidId, request, theme } from '../../utils';
import 'react-quill/dist/quill.snow.css';

const NouveauChantier = () => {
    const history = useHistory();
    const [show, setShow] = React.useState(false);
    const handleClose = React.useCallback(() => {setShow(false);}, []);

    const [data, setData] = React.useState({
        name: '',
        description: null,
        deadline: '',
    });

    const handleChange = React.useCallback(({ target: { name, value } }) => {
        setData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleQuillChange = React.useCallback((value) => {
        setData(prevState => ({
            ...prevState,
            description: value,
        }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        if (data.deadline === '') {
            data.deadline = null;
        }

        request.post('/api/yards', data).then(({ id_yard }) => {
            if (isValidId(id_yard)) {
                history.push(`/chantiers/${id_yard}`);
            }
        });
    }, [data, history]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title as="h2" style={{ color: theme.primaryDark }} className="mb-4">
                        <strong>Nouveau chantier</strong>
                    </Card.Title>
                    <FloatingLabel label="Nom du chantier" className="mb-4">
                        <Form.Control
                            required
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Nom du chantier"
                            size="lg"
                            type="text"
                        />
                    </FloatingLabel>
                    <ReactQuill
                        theme="snow"
                        className="mb-4"
                        onChange={handleQuillChange}
                        value={data.description}
                    />
                    <FloatingLabel label="date de fin" className="mb-4">
                        <Form.Control
                            required
                            placeholder="date de fin"
                            onChange={handleChange}
                            value={data.deadline}
                            name="deadline"
                            size="lg"
                            type="date"
                        />
                    </FloatingLabel>
                    <Card.Subtitle as="h4" className="mb-4">Entreprises</Card.Subtitle>
                    <Row sm={4}>
                        <Col>
                            <Card className="mb-4">
                                <Card.Body className="text-center">
                                    <PlusSquare size="4em" className="my-2" onClick={() => {setShow(true);}} />
                                    <ModalEnterprises show={show} onClose={handleClose} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button as={Link} to="/chantiers" variant="danger" className="me-3" children="Annuler" />
                        <Button variant="success" onClick={handleSubmit}>Créer</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NouveauChantier;
