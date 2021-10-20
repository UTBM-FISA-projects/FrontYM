import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Card, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';
import { Button } from '../../components';

import sha512 from 'crypto-js/sha512';

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const [invalid, setInvalid] = React.useState(false);

    const history = useHistory();

    const handleSubmit = React.useCallback((event) => {
        event.preventDefault();
        setLoading(true);
        setInvalid(false);

        const data = new FormData(event.target);
        data.set('password', sha512(data.get('password')));

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(Object.fromEntries(data)),
        })
            .then(res => {
                if (res.status === 200) {
                    history.push('/chantiers');
                } else if (res.status === 401) {
                    setInvalid(true);
                }
                setLoading(false);
            });
    }, [history]);

    return (
        <Container id="bg" className="d-flex justify-content-center align-items-center">
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Email" className="mb-3">
                            <Form.Control
                                required
                                name="email"
                                placeholder="email"
                                type="email"
                                size="lg"
                                isInvalid={invalid}
                            />
                            <Form.Control.Feedback type="invalid" children="Email ou mot de passe invalide" />
                        </FloatingLabel>
                        <FloatingLabel label="Mot de passe" className="mb-3">
                            <Form.Control
                                required
                                name="password"
                                placeholder="Mot de passe"
                                size="lg"
                                type="password"
                                isInvalid={invalid}
                            />
                            <Form.Control.Feedback type="invalid" children="Email ou mot de passe invalide" />
                        </FloatingLabel>
                        <Stack gap={2} className="mt-4">
                            <Button
                                variant="success"
                                type="submit"
                                loading={loading}
                                children="Connexion"
                            />
                            <Button
                                size="sm"
                                variant="outline-secondary"
                                as={Link}
                                to="/inscription"
                                children="S'inscrire"
                                disabled={loading}
                            />
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
