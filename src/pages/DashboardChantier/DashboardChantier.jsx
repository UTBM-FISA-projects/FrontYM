import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Container, Stack } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { CardDashboardChantier } from '../../components';

import { isValidId, request } from '../../utils';

const DashboardChantier = ({ idUser }) => {
    const [yards, setYards] = React.useState([]);

    React.useEffect(() => {
        if (isValidId(idUser)) {
            request.get(`/api/users/${idUser}/yards`).then(r => {
                setYards(r.data);
            });
        }
    }, [idUser]);

    return (
        <Container className="text-center">
            <Stack gap={4} className="mb-5">
                <Card>
                    <Card.Body>
                        <h1>Vos chantiers</h1>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Link to="/chantiers/nouveau">
                            <PlusSquare size="4em" />
                        </Link>
                    </Card.Body>
                </Card>
                {yards.map((yard) => (
                    <CardDashboardChantier key={yard.id_yard} yard={yard} />
                ))}
            </Stack>
        </Container>
    );
};

DashboardChantier.propTypes = {
    /** ID de l'utilisateur connecté */
    idUser: PropTypes.number.isRequired,
};

export default DashboardChantier;
