import React from 'react';

import { Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { BellFill, BellSlash } from 'react-bootstrap-icons';

import { theme } from '../../utils';

const NotificationPopover = () => (
    <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
            <Popover id="popover-basic">
                <Popover.Header as="h3">Notifications</Popover.Header>
                <Popover.Body>
                    <BellSlash size={30}/>{' '}
                    Aucune notifications
                </Popover.Body>
            </Popover>
        }
    >
        <Nav.Link><BellFill color={theme.primaryDark} size={30} /></Nav.Link>
    </OverlayTrigger>
);

export default NotificationPopover;
