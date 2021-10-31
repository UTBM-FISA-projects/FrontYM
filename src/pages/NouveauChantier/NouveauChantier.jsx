import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';

import ModalEnterprises from './ModalEnterprises';

import { isValidId, request, theme } from '../../utils';
import 'react-quill/dist/quill.snow.css';
import { CardEntreprise } from '../../components';

const NouveauChantier = () => {
    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState({
        name: false,
        deadline: false,
        proposals: false,
    });

    const [data, setData] = React.useState({
        name: '',
        description: null,
        deadline: '',
        proposals: [],
    });

    const history = useHistory();
    const handleClose = React.useCallback(() => {setShow(false);}, []);

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

    const handleProposalsChange = React.useCallback((proposals) => {
        setData(prevState => ({ ...prevState, proposals }));
        setShow(false);
    }, []);

    const handleSubmit = React.useCallback(() => {
        const date = new Date(data.deadline);

        const nameError = data.name.length === 0;
        const deadlineError = date <= new Date();
        const proposalsErrors = data.proposals.length === 0;

        setErrors(prev => ({
            ...prev,
            name: nameError,
            deadline: deadlineError,
            proposals: proposalsErrors,
        }));

        if (nameError || deadlineError || proposalsErrors) {
            return;
        }

        const sendingData = { ...data };
        sendingData.proposals = data.proposals.map(({ id_user }) => id_user);
        sendingData.deadline = data.deadline === '' ? null : data.deadline;

        request.post('/api/yards', sendingData).then(({ id_yard }) => {
            if (isValidId(id_yard)) {
                history.push(`/chantiers/${id_yard}`);
            }
        });
    }, [data, history]);

    return (
        <Container>
            <Card className="mb-5" style={{ boxShadow: `0 0 12px ${theme.secondaryDark}` }}>
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
                            isInvalid={errors.name}
                        />
                        <Form.Control.Feedback type="invalid">Le nom est obligatoire</Form.Control.Feedback>
                    </FloatingLabel>
                    <ReactQuill
                        theme="snow"
                        className="mb-4"
                        onChange={handleQuillChange}
                        value={data.description}
                    />
                    <FloatingLabel label="Date de fin" className="mb-4">
                        <Form.Control
                            required
                            placeholder="Date de fin"
                            onChange={handleChange}
                            value={data.deadline}
                            name="deadline"
                            size="lg"
                            type="date"
                            isInvalid={errors.deadline}
                        />
                        <Form.Control.Feedback type="invalid">
                            La date de fin doit être après aujourd'hui.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <Card.Subtitle as="h4" className="mb-4 mt-3">Entreprises</Card.Subtitle>
                    {errors.proposals && (
                        <p className="text-danger">Au moins une entreprise doit être sélectionnée !</p>
                    )}
                    <Row sm={2} className="mx-5 my-2">
                        <Col className="mb-4">
                            <Card style={{ height: '100%' }}>
                                <Card.Body className="d-flex align-items-center justify-content-center">
                                    <PlusSquare
                                        size="4em"
                                        className="my-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {setShow(true);}}
                                    />
                                    <ModalEnterprises
                                        show={show}
                                        selected={data.proposals}
                                        onClose={handleClose}
                                        onValidate={handleProposalsChange}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        {data.proposals.map((ent) => (
                            <Col key={ent.id_user} className="mb-4">
                                <CardEntreprise enterprise={ent} />
                            </Col>
                        ))}
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
