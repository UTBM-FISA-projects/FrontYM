import React from 'react';

import { ListGroup, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { BellFill, BellSlash } from 'react-bootstrap-icons';

import { notification, request, theme } from '../../utils';

const NotificationPopover = () => {
    const [notifs, setNotifs] = React.useState([]);

    React.useEffect(() => {
        request.get('/api/users/notifications').then(r => setNotifs(r.data));
    }, []);

    return (
        <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={
                <Popover id="notification-popover">
                    <Popover.Header as="h3">Notifications</Popover.Header>
                    <Popover.Body style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                        {notifs.length === 0 ? (
                            <>
                                <BellSlash size={30} />{' '}
                                Aucune notifications
                            </>
                        ) : (
                            <ListGroup variant="flush">
                                {notifs.map((n) => (
                                    <ListGroup.Item key={n.id_notification}>
                                        {notification[n.notification_type.title](n)}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Popover.Body>
                </Popover>
            }
        >
            <Nav.Link><BellFill color={theme.primaryDark} size={30} /></Nav.Link>
        </OverlayTrigger>
    );
};

export default NotificationPopover;
