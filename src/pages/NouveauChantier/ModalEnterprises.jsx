import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { CardEntreprise, Pagination } from '../../components';

import { request, userShape } from '../../utils';

const ModalEnterprises = (props) => {
    const {
        show,
        onClose,
        onValidate,
        selected: selectedProps,
    } = props;

    const [enterprises, setEnterprises] = React.useState([]);
    const [selected, setSelected] = React.useState([]); // Liste d'entreprises
    const [search, setSearch] = React.useState('');

    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);

    React.useEffect(() => {
        request.get(`/api/users/enterprises`, { q: search, page: currentPage }).then(r => {
            setEnterprises(r.data);
            setCurrentPage(r.current_page);
            setLastPage(r.last_page);
        });
    }, [currentPage, search]);

    const handleSearchChange = React.useCallback(({ target: { value } }) => {
        setSearch(value);
    }, []);

    const handleClose = React.useCallback(() => {
        setSelected(selectedProps);
        if (onClose) {
            onClose();
        }
    }, [onClose, selectedProps]);

    const handleValidate = React.useCallback(() => {
        if (onValidate) {
            onValidate(selected);
        }
    }, [onValidate, selected]);

    const toggleSelected = React.useCallback((ent) => {
        setSelected(prevState => {
            // si l'élément existe ...
            if (prevState.find(({ id_user }) => id_user === ent.id_user) !== undefined) {
                // ... on le supprime ...
                return prevState.filter((item) => item.id_user !== ent.id_user);
            }
            // ... sinon on l'ajoute
            return prevState.concat([ent]);
        });
    }, []);

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Body className="mx-5">
                <Form.Control
                    placeholder="Rechercher"
                    type="search"
                    value={search}
                    className="mb-4 text-center"
                    onChange={handleSearchChange}
                />
                <Row md={2} className="mx-5">
                    {enterprises.map((ent) => (
                        <Col key={ent.id_user} className="mb-4" onClick={() => {toggleSelected(ent);}}>
                            <CardEntreprise
                                enterprise={ent}
                                selected={selected.find(({ id_user }) => id_user === ent.id_user) !== undefined}
                            />
                        </Col>
                    ))}
                </Row>
                <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={handleClose} className="me-3">Annuler</Button>
                    <Button variant="success" onClick={handleValidate}>Ajouter</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalEnterprises.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onValidate: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.shape(userShape)),
};

ModalEnterprises.defaultProps = {
    show: false,
    onClose: null,
    onValidate: null,
    selected: [],
};

export default ModalEnterprises;
