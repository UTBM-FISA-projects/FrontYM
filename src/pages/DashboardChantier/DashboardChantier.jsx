import React from 'react';
import PropTypes from 'prop-types';

import { Card, Container, Stack } from 'react-bootstrap';

import { CardDashboardChantier } from '../../components';

import { isValidId, request, theme, userShape } from '../../utils';
import { Link } from 'react-router-dom';
import { PlusSquare } from 'react-bootstrap-icons';

const DashboardChantier = ({ user: { id_user, type } }) => {
    const [yards, setYards] = React.useState([]);

    React.useEffect(() => {
        if (isValidId(id_user)) {
            request.get(`/api/users/${id_user}/yards`).then(r => {
                setYards(r.data);
            });
        }
    }, [id_user]);

    const handleDelete = React.useCallback((id_yard) => {
        request.delete(`/api/yards/${id_yard}`).then(() => {
            setYards(prevState => prevState.filter(item => item.id_yard !== id_yard));
        });
    }, []);

    const handleArchive = React.useCallback((id_yard) => {
        request.put(`/api/yards/${id_yard}`, {
            archived: true,
        })
            .then(r => {
                setYards(prevState => prevState.map(item => item.id_yard === id_yard ? r : item));
            });
    }, []);

    return (
        <Container className="text-center">
            <Stack gap={4} className="mb-5">
                <Card>
                    <Card.Body>
                        <h1 style={{ color: theme.primaryDark }}>
                            <strong>Vos chantiers</strong>
                        </h1>
                    </Card.Body>
                </Card>
                {type === 'project_owner' && (
                    <Card>
                        <Card.Body>
                            <Link to="/chantiers/nouveau">
                                <PlusSquare size="4em" />
                            </Link>
                        </Card.Body>
                    </Card>
                )}
                {yards.map((yard) => (
                    <CardDashboardChantier
                        key={yard.id_yard}
                        yard={yard}
                        onDelete={handleDelete}
                        onArchive={handleArchive}
                    />
                ))}
            </Stack>
        </Container>
    );
};

DashboardChantier.propTypes = {
    /** Utilisateur connecté */
    user: PropTypes.shape(userShape).isRequired,
};

export default DashboardChantier;
