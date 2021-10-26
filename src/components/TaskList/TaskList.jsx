import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Card } from 'react-bootstrap';

import { date, isValidId, request, theme } from '../../utils';
import { EstimatedTime } from '../EstimatedTime';

const TaskList = ({ id_yard, state }) => {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        if (isValidId(id_yard)) {
            request.get(`/api/yards/${id_yard}/tasks?state=${state}`).then(r => {
                setTasks(r.data);
            });
        }
    }, [id_yard, state]);

    return tasks.map((task) => (
        <Card key={task.id_task}
              className="my-3 mx-2 overflow-hidden"
              style={{ boxShadow: `0 0 2px ${theme.primaryLight}` }}>
            <Card.Body>
                <Card.Title as="h6" className="d-flex justify-content-between">
                    {task.title}
                    <small className="fs-6">
                        <EstimatedTime spentTime={task.time_spent} estimatedTime={task.estimated_time} />
                    </small>
                </Card.Title>
                <Badge className="mb-2 text-wrap" bg="light" text="secondary">
                    Début prévu : {date.long(task.start_planned_date)}
                </Badge>
                <Card.Text className="lh-1 text-muted"><small>{task.description}</small></Card.Text>
            </Card.Body>
        </Card>
    ));
};

TaskList.propTypes = {
    id_yard: PropTypes.number.isRequired,
    state: PropTypes.oneOf(['todo', 'doing', 'done']),
};

TaskList.defaultProps = {
    state: 'doing',
};

export default TaskList;
