import React from 'react';

import { Card, Container, Table } from 'react-bootstrap';

import { isValidId, request, theme } from '../../utils';
import PropTypes from 'prop-types';

const ListeEmploye = ({ idUser }) => {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
            if (isValidId(idUser)) {
                request.get(`/api/users/${idUser}/employees`).then(r => setUsers(r.data));
            }
        },
        [idUser],
    );

    const Employee = ({ name, email, phone, description }) => {
        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>********</td>
                <td>{description}</td>
            </tr>
        );
    };

    return (
        <Container>
            <Card>
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
                            <th>Mot de passe</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(({ id_user, name, phone, email, description }) => (
                            <Employee
                                key={id_user}
                                name={name}
                                email={email}
                                phone={phone}
                                description={description}
                            />
                        ))}
                        </tbody>
                    </Table>
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
