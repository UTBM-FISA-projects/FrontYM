import React from 'react';

import { Card, Container, Table } from 'react-bootstrap';

import { isValidId, request, theme } from '../../utils';
import PropTypes from 'prop-types';
import { Plus } from 'react-bootstrap-icons';
import ModalAjoutEmploye from './ModalAjoutEmploye';
import { Pagination } from '../../components';

const ListeEmploye = ({ idUser }) => {

    const [users, setUsers] = React.useState([]);
    const [show, setShow] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);

    const handleClose = React.useCallback(() => {
        setShow(false);
    }, []);

    React.useEffect(() => {
            if (isValidId(idUser)) {
                request.get(`/api/users/${idUser}/employees`, { page: currentPage }).then(r => {
                    setUsers(r.data);
                    setCurrentPage(r.current_page);
                    setLastPage(r.last_page);
                });
            }
        },
        [currentPage, idUser],
    );

    return (
        <Container>
            <Card className="mb-5" style={{ boxShadow: `0 0 12px ${theme.secondaryDark}` }}>
                <Card.Body>
                    <Card.Title as="h2" className="text-center mb-4" style={{ color: theme.primaryDark }}>
                        <strong>Employés</strong>
                    </Card.Title>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(({ id_user, name, phone, email, description }) => (
                            <tr key={id_user}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} onClick={() => {
                                setShow(true);
                            }}>
                                <div className="d-flex justify-content-center">
                                    <Plus size={40} />
                                </div>
                            </td>
                            <ModalAjoutEmploye
                                show={show}
                                onClose={handleClose}
                                idEnterprise={idUser}
                            />
                        </tr>
                        </tbody>
                    </Table>
                    <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
                </Card.Body>
            </Card>
        </Container>
    );
};

ListeEmploye.propTypes = {
    /** ID de l'utilisateur connecté */
    idUser: PropTypes.number.isRequired,
};

export default ListeEmploye;
