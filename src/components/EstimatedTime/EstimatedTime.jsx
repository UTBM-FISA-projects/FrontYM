import React from 'react';
import PropTypes from 'prop-types';

import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EstimatedTime = ({ estimatedTime, spentTime }) => (
    <>
        <OverlayTrigger overlay={<Tooltip children="Temps passé" />}>
            <Badge bg={spentTime > estimatedTime ? 'danger' : 'success'}>{spentTime}</Badge>
        </OverlayTrigger>{' '}
        <OverlayTrigger overlay={<Tooltip children="Temps estimé" />}>
            <Badge bg="secondary">{estimatedTime}</Badge>
        </OverlayTrigger>
    </>
);

EstimatedTime.propTypes = {
    estimatedTime: PropTypes.string.isRequired,
    spentTime: PropTypes.string.isRequired,
};

export default EstimatedTime;
