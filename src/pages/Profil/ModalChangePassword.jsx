import React from 'react';

import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Button } from '../../components';

import { request, theme } from '../../utils';
import sha512 from 'crypto-js/sha512';

const ModalChangePassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.target);
        data.set('old_password', sha512(data.get('old_password')));
        data.set('password', sha512(data.get('password')));
        data.set('password_confirmation', sha512(data.get('password_confirmation')));

        request.put('/api/users/password', data).then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Button
                variant="warning"
                className="mb-4"
                onClick={() => {setShow(true);}}
                children="Changer de mot de passe"
            />
            <Modal show={show} onHide={() => {setShow(false);}}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <h2 style={{ color: theme.primaryDark }} className="mb-4">
                            <strong>Changement de mot de passe</strong>
                        </h2>
                        <FloatingLabel label="Ancien mot de passe" className="mb-4">
                            <Form.Control
                                required
                                name="old_password"
                                placeholder="Ancien mot de passe"
                                type="password"
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Nouveau mot de passe" className="mb-4">
                            <Form.Control
                                required
                                name="password"
                                placeholder="Nouveau mot de passe"
                                type="password"
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Confirmation du mot de passe" className="mb-4">
                            <Form.Control
                                required
                                name="password_confirmation"
                                placeholder="Confirmation du mot de passe"
                                type="password"
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            children="Annuler"
                            onClick={() => {setShow(false);}}
                            disabled={loading}
                        />
                        <Button children="Changer" type="submit" loading={loading} />
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalChangePassword;
