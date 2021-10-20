import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import { theme, userType } from '../../utils';

const Profil = ({ user: userProps }) => {
    const [user, setUser] = React.useState({});

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

    const handleChange = React.useCallback(({ target: { name, value } }) => {
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body as={Form}>
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
                            <Form.Control plaintext value={name} name="name" onChange={handleChange} />
                            <p>{userType.names[type]}</p>
                            <p>Entreprise d'appartenance : {id_enterprise}</p>
                        </Col>
                    </Row>
                    <Form.Label>Description</Form.Label>
                    <ReactQuill theme="snow" className="mb-4" />
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column children="Email :" sm={2} />
                        <Col sm={10}>
                            <Form.Control type="email" plaintext value={email} name="email" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column children="Téléphone :" sm={2} />
                        <Col sm={10}>
                            <Form.Control type="tel" plaintext name="phone" value={phone} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    );
};

Profil.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Profil;
