import React from 'react';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Archive, ThreeDotsVertical, Trash } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const OptionsOverlay = ({ id_yard, onDelete, onArchive }) => {
    const handleDelete = React.useCallback(() => {
        if (onDelete) {
            onDelete(id_yard)
        }
    }, [id_yard, onDelete]);

    const handleArchive = React.useCallback(() => {
        if (onArchive) {
            onArchive(id_yard)
        }
    }, [id_yard, onArchive]);

    return (
        <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={
                <Popover>
                    <Popover.Body>
                        <div role="button" className="mb-2" onClick={handleDelete}><Trash /> Supprimer</div>
                        <div role="button" onClick={handleArchive}><Archive /> Archiver</div>
                    </Popover.Body>
                </Popover>
            }
        >
            <ThreeDotsVertical role="button" />
        </OverlayTrigger>
    );
};

OptionsOverlay.propTypes = {
    id_yard: PropTypes.number.isRequired,
    onDelete: PropTypes.func,
    onArchive: PropTypes.func,
};

export default OptionsOverlay;
