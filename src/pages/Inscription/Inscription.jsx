import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Card, Container, FloatingLabel, Form, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';

import { Button } from '../../components';

import sha512 from 'crypto-js/sha512';
import { request, theme } from '../../utils';

const Inscription = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);

        data.set('password', sha512(data.get('password')));
        data.set('password_confirmation', sha512(data.get('password_confirmation')));

        request.post('/api/users', data).then(() => {
            // TODO gérer les erreurs
            history.push('/connexion');
            setLoading(false);
        });
    }, [history]);

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
                <Card.Body as={Form} onSubmit={handleSubmit}>
                    <FloatingLabel label="Qui êtes vous ?">
                        <Form.Select required name="type" size="lg" className="mb-3">
                            <option value="project_owner">Client</option>
                            <option value="enterprise">Entreprise</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel label="Nom/Titre" className="mb-3">
                        <Form.Control required name="name" placeholder="Nom/Titre" size="lg" type="text" />
                    </FloatingLabel>
                    <FloatingLabel label="Téléphone" className="mb-3">
                        <Form.Control required name="phone" placeholder="Téléphone" size="lg" type="phone" />
                    </FloatingLabel>
                    <FloatingLabel label="E-mail" className="mb-3">
                        <OverlayTrigger
                            placement="top"
                            trigger={'focus'}
                            overlay={<Tooltip>Attention cette adresse e-mail sera votre identifiant !</Tooltip>}
                        >
                            <Form.Control
                                required
                                name="email"
                                placeholder="E-mail"
                                size="lg"
                                type="email"
                            />
                        </OverlayTrigger>
                    </FloatingLabel>
                    <Stack direction="horizontal" gap={3} className="mb-5">
                        <FloatingLabel label="Mot de passe" className="mb-3">
                            <Form.Control
                                required
                                name="password"
                                placeholder="Mot de passe"
                                size="lg"
                                type="password"
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Confirmation du mot de passe" className="mb-3">
                            <Form.Control
                                required
                                name="password_confirmation"
                                placeholder="Confirmation du mot de passe"
                                size="lg"
                                type="password"
                            />
                        </FloatingLabel>
                    </Stack>
                    <Stack gap={2}>
                        <Button
                            variant="success"
                            loading={loading}
                            type="submit"
                            className="mx-10 px-5 position-absolute bottom-0 start-0 m-3"
                            children="S'inscrire"
                        />
                        <Button
                            variant="danger"
                            type="submit"
                            className="mx-10 px-5 position-absolute bottom-0 end-0 m-3"
                            children="Annuler"
                        />
                        <Button
                            as={Link}
                            loading={loading}
                            to="/connexion"
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            className="mx-auto px-5 position-absolute bottom-0 start-50 translate-middle-x m-3"
                            children="Se connecter"
                        />
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Inscription;
