import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Container, FloatingLabel, Form, Overlay, Stack, Tooltip } from 'react-bootstrap';

import { theme } from '../../utils';

const Inscription = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <Container id="bg" className="d-flex justify-content-center align-items-center">
            <Card>
                <Card.Header
                    as="h2"
                    className="d-flex justify-content-center"
                    style={{ color: theme.primaryDark }}
                >
                    Inscription
                </Card.Header>
                <Card.Body as={Form}>
                    <Form.Select required size="lg" className="mb-3">
                        <option>Qui êtes vous ?</option>
                        <option value="1">Client</option>
                        <option value="2">Entreprise</option>
                    </Form.Select>
                    <FloatingLabel label="Nom/Titre" className="mb-3">
                        <Form.Control required placeholder="Nom/Titre" size="lg" type="text" />
                    </FloatingLabel>
                    <FloatingLabel label="Téléphone" className="mb-3">
                        <Form.Control required placeholder="Téléphone" size="lg" type="phone" />
                    </FloatingLabel>
                    <FloatingLabel label="E-mail" className="mb-3">
                        <Form.Control
                            required
                            placeholder="E-mail"
                            ref={target}
                            size="lg"
                            type="email"
                            onFocus={() => setShow(true)}
                            onBlur={() => setShow(false)}
                        />
                        <Overlay target={target.current} show={show} placement="top">
                            {(props) => (
                                <Tooltip {...props}>
                                    Attention cette adresse e-mail sera votre identifiant !
                                </Tooltip>
                            )}
                        </Overlay>
                    </FloatingLabel>
                    <Stack direction="horizontal" gap={3}>
                        <FloatingLabel label="Mot de passe" className="mb-3">
                            <Form.Control required placeholder="Mot de passe" size="lg" type="password" />
                        </FloatingLabel>
                        <FloatingLabel label="Confirmation du mot de passe" className="mb-3">
                            <Form.Control
                                required
                                placeholder="Confirmation du mot de passe"
                                size="lg"
                                type="password"
                            />
                        </FloatingLabel>
                    </Stack>
                    <Stack gap={2}>
                        <Button variant="success" type="submit" className="mx-auto px-5">S'inscrire</Button>
                        <Button
                            as={Link}
                            to="/connexion"
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            className="mx-auto px-5"
                            children="Se connecter"
                        />
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Inscription;
