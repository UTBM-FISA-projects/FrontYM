import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Badge, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { EyeFill, ThreeDotsVertical } from 'react-bootstrap-icons';

import { TaskList } from '../TaskList';

import { isValidId, request, theme, yardShape } from '../../utils';
import { EstimatedTime } from '../EstimatedTime';

const CardDashboardChantier = ({ userTypes, yard }) => {
    const {
        id_yard,
        name,
        supervisor: {
            name: supervisorName,
            id_enterprise,
        },
        done_tasks,
        total_tasks,
        total_estimated_time,
        total_time_spent,
    } = yard;

    const [enterprise, setEnterprise] = React.useState({});

    React.useEffect(() => {
        if (isValidId(id_enterprise)) {
            request.get(`/api/users/${id_enterprise}`).then(setEnterprise);
        }
    }, [id_enterprise]);

    const progress = Math.round(done_tasks * 100 / total_tasks);

    return (
        <Card>
            <Card.Body>
                <Row className="text-start">
                    <Col style={{ borderRight: '1px #c2c2c2 solid' }}>
                        <Link to={`/chantiers/${id_yard}`} style={{ color: theme.primaryDark }}>
                            <h3>
                                {userTypes === 'prestataire' && 'Prestation sur '}{name}
                                {' '}<EyeFill size="0.8em" />
                            </h3>
                        </Link>
                        {userTypes !== 'prestataire' && (
                            <div className="mt-4">
                                <h4>Progression générale</h4>
                                <div>Progression du chantier</div>
                                <ProgressBar className="mb-2" now={progress} label={`${progress}%`} />
                                <EstimatedTime spentTime={total_time_spent} estimatedTime={total_estimated_time} />
                            </div>
                        )}
                        {userTypes === 'prestataire' && (
                            <div className="mt-4">
                                <h4>Prochaine intervention</h4>
                                <Badge bg="light" text="dark" className="mt-3">Mercredi 27 octobre 2021 à 13h</Badge>
                            </div>
                        )}
                        <div className="mt-4">
                            <h4>Responsable</h4>
                            <div>{enterprise.name}</div>
                            <Badge bg="light" text="dark">Conducteur de travaux {supervisorName}</Badge>
                        </div>
                    </Col>
                    <Col>
                        <h4>Mission en cours</h4>
                        <TaskList id_yard={id_yard} />
                    </Col>
                </Row>
                <div style={{ top: '2%', right: '0.5%', position: 'absolute' }}><ThreeDotsVertical /></div>
            </Card.Body>
        </Card>
    );
};

CardDashboardChantier.propTypes = {
    userTypes: PropTypes.string,
    yard: PropTypes.shape(yardShape).isRequired,
};

export default CardDashboardChantier;
