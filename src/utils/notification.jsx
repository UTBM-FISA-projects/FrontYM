/* eslint-disable no-template-curly-in-string */
import React from 'react';

import { Stack } from 'react-bootstrap';

import { Button } from '../components';
import request from './request';
import isValidId from './isValidId';

/**
 * Envoie une requête pour marquer une notification comme lu.
 * @param id {number}
 */
const setRead = (id) => {
    if (isValidId(id)) {
        request.put(`/api/notifications/${id}/read`, null);
    }
};

/**
 * Notification supprimée.
 *
 * @param id {number}
 * @return {JSX.Element}
 */
const DeletedNotification = (id) => (
    <span
        onClick={() => {setRead(id);}}
        className="text-muted"
    >
        Notification supprimée
    </span>
);

const notification = {

    /**
     * Affiche la notification d'un proposition de chantier.
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    proposition: (notif) => {
        const {
            id_notification,
            notification_type,
            parameters,
        } = notif;

        let template = notification_type.template;

        try {
            template = template.replace('${project_owner}', parameters.project_owner.name);
            template = template.replace('${yard}', parameters.yard.name);
        } catch (e) {
            return DeletedNotification(id_notification);
        }

        return (
            <div className="my-2" onClick={() => {setRead(id_notification);}}>
                <div className="mb-2">{template}</div>
                <Stack direction="horizontal" gap={2} className="d-flex justify-content-center">
                    <Button
                        children="Accepter"
                        onClick={() => {console.log('valider');}}
                        variant="outline-success"
                        size="sm"
                    />
                    <Button
                        children="Décliner"
                        onClick={() => {console.log('decliner');}}
                        variant="outline-danger"
                        size="sm"
                    />
                </Stack>
            </div>
        );
    },

    /**
     * Notification d'une proposition de mission.
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    proposition_mission: (notif) => {
        const {
            id_notification,
            notification_type,
            parameters,
        } = notif;

        let template = notification_type.template;

        try {
            template = template.replace('${enterprise}', parameters.enterprise.name);
            template = template.replace('${task}', parameters.task.title);
            template = template.replace('${yard}', parameters.yard.name);
        } catch (e) {
            return DeletedNotification(id_notification);
        }

        return template;
    },

    /**
     * Notification du dépassement du temps estimé d'une tache.
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    overtime: (notif) => {
        const {
            id_notification,
            notification_type,
            parameters,
        } = notif;

        let template = notification_type.template;

        try {
            template = template.replace('${task}', parameters.task.title);
        } catch (e) {
            return DeletedNotification(id_notification);
        }

        return template;
    },
};

export default notification;
