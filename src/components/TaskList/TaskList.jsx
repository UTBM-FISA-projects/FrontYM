import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Card } from 'react-bootstrap';

import { date, isValidId, request, theme } from '../../utils';
import { EstimatedTime } from '../EstimatedTime';
import { Button } from '../Button';

const TaskList = ({ id_yard, state }) => {
    const [tasks, setTasks] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (isValidId(id_yard)) {
            setLoading(true);

            request.get(`/api/yards/${id_yard}/tasks`, { state, page: currentPage }).then(r => {
                setTasks((prev) => ([...prev, ...r.data]));
                setCurrentPage(r.current_page);
                setLastPage(r.last_page);
                setLoading(false);
            });
        }
    }, [currentPage, id_yard, state]);

    return (
        <>
            {tasks.map((task) => (
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
                        {task.start_planned_date && (
                            <Badge className="mb-2 text-wrap" bg="light" text="secondary">
                                Début prévu : {date.long(task.start_planned_date)}
                            </Badge>
                        )}
                        <Card.Text className="lh-1 text-muted">
                            <small dangerouslySetInnerHTML={{ __html: task.description }} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            {currentPage !== lastPage && (
                <div className="d-flex justify-content-center">
                    <Button
                        loading={loading}
                        children="Charger plus"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {setCurrentPage(currentPage + 1);}}
                    />
                </div>
            )}
        </>
    );
};

TaskList.propTypes = {
    id_yard: PropTypes.number.isRequired,
    state: PropTypes.oneOf(['todo', 'doing', 'done']),
};

TaskList.defaultProps = {
    state: 'doing',
};

export default TaskList;
