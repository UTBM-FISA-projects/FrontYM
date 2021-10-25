import React from 'react';

import AvailableTimes from 'react-available-times';
import { Card, Container, Spinner } from 'react-bootstrap';

import { isValidId, request, theme } from '../../utils';
import PropTypes from 'prop-types';

/**
 * Formate les dates API en objet Date.
 * @param list {Object[]}
 * @return {Object[]}
 */
const formatDates = (list) => (
    list.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
    }))
);

const Availability = ({ idUser }) => {
    const [availabilities, setAvailabilities] = React.useState([]);

    React.useEffect(() => {
        if (isValidId(idUser)) {
            request.get(`/api/users/${idUser}/availabilities`).then(r => setAvailabilities(formatDates(r.data)));
        }
    }, [idUser]);

    return (
        <Container>
            <Card className="mb-5" style={{ boxShadow: `0 0 12px ${theme.secondaryDark}` }}>
                <Card.Body>
                    <Card.Title as="h2" style={{ color: theme.primaryDark }}>
                        <u><strong>Disponibilités</strong></u>
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-3">
                        Remplissez les disponibilités de votre entreprise.
                    </Card.Subtitle>
                    {availabilities.length !== 0 ? (
                        <AvailableTimes
                            weekStartsOn="monday"
                            onChange={setAvailabilities}
                            initialSelections={availabilities}
                        />
                    ) : (
                        <div className="d-flex justify-content-center mt-5 mb-3">
                            <Spinner animation="border" variant="warning" />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

Availability.propTypes = {
    idUser: PropTypes.number.isRequired,
};

export default Availability;
