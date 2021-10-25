import React from 'react';
import PropTypes from 'prop-types';

import AvailableTimes from 'react-available-times';
import { Card, Container, Spinner } from 'react-bootstrap';

import { Button } from '../../components';

import { isValidId, request, theme } from '../../utils';

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
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (isValidId(idUser)) {
            setLoading(true);
            request.get(`/api/users/${idUser}/availabilities`).then(r => {
                setAvailabilities(formatDates(r.data));
                setLoading(false);
            });
        }
    }, [idUser]);

    const handleSave = React.useCallback(() => {
        setLoading(true);
        request.put('/api/availabilities', availabilities).then(r => {
            setAvailabilities(formatDates(r.data));
            setLoading(false);
        });
    }, [availabilities]);

    return (
        <Container>
            <Card className="mb-5" style={{ boxShadow: `0 0 12px ${theme.secondaryDark}` }}>
                <Card.Body>
                    <Card.Title as="h2" style={{ color: theme.primaryDark }}>
                        <strong>Disponibilités</strong>
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-3">
                        Remplissez les disponibilités de votre entreprise.
                    </Card.Subtitle>
                    <Button variant="success" children="Sauvegarder" onClick={handleSave} loading={loading} />
                    {!loading ? (
                        <AvailableTimes
                            weekStartsOn="monday"
                            onChange={(selections) => {
                                console.log(selections);
                                setAvailabilities(selections);
                            }}
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
