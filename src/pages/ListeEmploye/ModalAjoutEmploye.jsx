import React from 'react';

import { FloatingLabel, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { request, theme } from '../../utils';
import PropTypes from 'prop-types';
import sha512 from 'crypto-js/sha512';
import { Button } from '../../components';

const ModalAjoutEmploye = (props) => {

    const {
        idEnterprise,
        show,
        onClose,
    } = props;

    const handleClose = React.useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);
        data.set('password', sha512(data.get('password')));
        data.set('password_confirmation', sha512(data.get('password_confirmation')));
        data.set('type', 'supervisor');
        data.set('id_enterprise', idEnterprise);

        request.post('/api/users', data).then(() => {
            setLoading(false);
        });
        handleClose();
    }, [idEnterprise]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body onSubmit={handleSubmit} as={Form}>
                <h2 style={{ color: theme.primaryDark }} className="mb-4">
                    <strong>Création d'un employé</strong>
                </h2>
                <FloatingLabel label="Nom" className="mb-3">
                    <Form.Control required name="name" placeholder="Nom/Titre" size="lg" type="text" />
                </FloatingLabel>
                <FloatingLabel label="Téléphone" className="mb-3">
                    <Form.Control name="phone" placeholder="Téléphone" size="lg" type="tel" />
                </FloatingLabel>
                <FloatingLabel label="E-mail" className="mb-4">
                    <OverlayTrigger
                        placement="top"
                        trigger={'focus'}
                        overlay={<Tooltip>Ceci sera l'identifiant de votre employé !</Tooltip>}
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
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={handleClose} loading={loading} className="me-3">Annuler</Button>
                    <Button variant="success" type="submit" loading={loading}>Ajouter</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalAjoutEmploye.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    idEnterprise: PropTypes.number.isRequired,
};

ModalAjoutEmploye.defaultProps = {
    show: false,
    onClose: null,
};

export default ModalAjoutEmploye;
