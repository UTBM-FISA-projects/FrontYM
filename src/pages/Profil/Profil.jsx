import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from '../../components';
import ReactQuill from 'react-quill';

import { request, theme, userType } from '../../utils';
import 'react-quill/dist/quill.snow.css';

const Profil = ({ user: userProps }) => {
    const [user, setUser] = React.useState({});
    const [enterprise, setEnterprise] = React.useState({});
    const [saving, setSaving] = React.useState(false);

    const {
        name,
        description,
        type = 'project_owner',
        email,
        phone,
        id_enterprise,
    } = user;

    React.useEffect(() => {
        setUser(userProps);
    }, [userProps]);

    React.useEffect(() => {
        if (id_enterprise) {
            request.get(`/api/users/${id_enterprise}`).then(setEnterprise);
        }
    }, [id_enterprise]);

    const handleChange = React.useCallback(({ target: { name, value } }) => {
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleQuillChange = React.useCallback((content) => {
        setUser(prevState => ({
            ...prevState,
            description: content,
        }));
    }, []);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        setSaving(true);
        request.put('/api/users', user).then(() => {
            setSaving(false);
        });
    }, [user]);

    return (
        <Container>
            <Card>
                <Card.Body as={Form} onSubmit={handleSubmit}>
                    <Card.Title as="h2" style={{ color: theme.primaryDark }}>
                        <u><strong>Profil</strong></u>
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-5">
                        Ici vous pouvez consulter ou modifier votre profil.
                    </Card.Subtitle>
                    <Row className="mb-5">
                        <Col sm={3}>
                            {React.createElement(userType.icons[type], { size: '100%', className: 'px-5' })}
                        </Col>
                        <Col sm={7}>
                            <h2><Form.Control plaintext value={name} name="name" onChange={handleChange} /></h2>
                            <div className="text-muted">{userType.names[type]}</div>
                            {type === 'supervisor' && <div>Entreprise d'appartenance : {enterprise.name}</div>}
                        </Col>
                    </Row>
                    <Form.Label as="h3" className="mb-3" style={{ color: theme.primaryDark }}>Description</Form.Label>
                    <ReactQuill
                        value={description || ''}
                        onChange={handleQuillChange}
                        placeholder="Description ..."
                        className="mb-5"
                    />
                    <h3 style={{ color: theme.primaryDark }}>Informations personnelles</h3>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column children="Email :" sm={2} />
                        <Col sm={10}>
                            <Form.Control type="email" plaintext value={email} name="email" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column children="Téléphone :" sm={2} />
                        <Col sm={10}>
                            <Form.Control type="tel" plaintext name="phone" value={phone} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="danger"
                            className="me-3"
                            onClick={() => {
                                setUser(userProps);
                            }}
                            children="Annuler"
                        />
                        <Button variant="success" type="submit" loading={saving}>Sauvegarder</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

Profil.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Profil;
