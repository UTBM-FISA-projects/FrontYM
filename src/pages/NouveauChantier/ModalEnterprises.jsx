import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { CardEntreprise } from '../../components';

import { request } from '../../utils';

const ModalEnterprises = ({ show, onClose }) => {
    const [enterprises, setEnterprises] = React.useState([]);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        request.get(`/api/users/enterprises?q=${search}`).then(r => {setEnterprises(r.data);});
    }, [search]);

    const handleSearchChange = React.useCallback(({ target: { value } }) => {
        setSearch(value);
    }, []);

    const toggleSelected = React.useCallback((id_selected) => {
        // On inverse la propriété selected de l'élément concerné
        setEnterprises(prevState => (
            prevState.map((item) => {
                if (item.id_user === id_selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            })
        ));
    }, []);

    return (
        <Modal size="xl" show={show} onHide={onClose}>
            <Modal.Body className="mx-5">
                <Form.Control
                    placeholder="Rechercher"
                    type="search"
                    className="mb-4 text-center"
                    onChange={handleSearchChange}
                />
                <Row md={2} className="mx-5">
                    {enterprises.map((ent) => (
                        <Col key={ent.id_user} className="mb-4" onClick={() => {toggleSelected(ent.id_user);}}>
                            <CardEntreprise enterprise={ent} selected={ent.selected} />
                        </Col>
                    ))}
                </Row>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={onClose} className="me-3">Annuler</Button>
                    <Button variant="success">Ajouter</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalEnterprises.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

ModalEnterprises.defaultProps = {
    show: false,
    onClose: null,
};

export default ModalEnterprises;
