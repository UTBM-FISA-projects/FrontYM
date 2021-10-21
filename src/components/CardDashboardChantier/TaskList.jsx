import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { isValidId, request, theme } from '../../utils';

const TaskList = ({ id_yard }) => {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        if (isValidId(id_yard)) {
            request.get(`/api/yards/${id_yard}/tasks?state=doing`).then(r => {
                setTasks(r.data);
            });
        }
    }, [id_yard]);

    return (
        <>
            <h4>Mission en cours</h4>
            {tasks.map((task) => (
                <Card key={task.id_task} className="m-3" style={{ boxShadow: `0 0 2px ${theme.primaryLight}` }}>
                    <Card.Body>
                        <Card.Title as="h5" className="d-flex justify-content-between">
                            {task.title}
                            <small className="fs-6">
                                <OverlayTrigger overlay={<Tooltip children="Temps passé" />}>
                                    <Badge bg={task.time_spent > task.estimated_time ? 'danger' : 'success'}>{task.time_spent}</Badge>
                                </OverlayTrigger>{' '}
                                <OverlayTrigger overlay={<Tooltip children="Temps estimé" />}>
                                    <Badge bg="secondary">{task.estimated_time}</Badge>
                                </OverlayTrigger>
                            </small>
                        </Card.Title>
                        <Card.Text className="lh-1 text-muted"><small>{task.description}</small></Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

TaskList.propTypes = {
    id_yard: PropTypes.number.isRequired,
};

export default TaskList;
