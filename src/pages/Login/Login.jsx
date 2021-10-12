import React from 'react';
import './Login.css';
import { Button, Card, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';

const Login = () => (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card>
            <Card.Body>
                <Form>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control required placeholder="test@email.com" type="email" size="lg" />
                    </FloatingLabel>
                    <FloatingLabel label="Mot de passe" className="mb-3">
                        <Form.Control required placeholder="Mot de passe" size="lg" type="password" />
                    </FloatingLabel>
                    <Stack gap={2} className="mt-4">
                        <Button variant="success" type="submit">Connexion</Button>
                        <Button size="sm" variant="outline-secondary" as="a" href="/inscription">S'inscrire</Button>
                    </Stack>
                </Form>
            </Card.Body>
        </Card>
    </Container>
);

export default Login;
