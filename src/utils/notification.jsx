/* eslint-disable no-template-curly-in-string */
import React from 'react';

import { Stack } from 'react-bootstrap';

import { Button } from '../components';

const notification = {

    /**
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    proposition: (notif) => {
        let template = notif.notification_type.template;

        try {
            template = template.replace('${project_owner}', notif.parameters.project_owner.name);
            template = template.replace('${yard}', notif.parameters.yard.name);
        } catch (e) {
            return <span className="text-muted">Notification supprimée</span>
        }

        return (
            <div className="my-2" onClick={() => {console.log("read");}}>
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
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    proposition_mission: (notif) => {
        let template = notif.notification_type.template;

        try {
            template = template.replace('${enterprise}', notif.parameters.enterprise.name);
            template = template.replace('${task}', notif.parameters.task.title);
            template = template.replace('${yard}', notif.parameters.yard.name);
        } catch (e) {
            return <span className="text-muted">Notification supprimée</span>;
        }

        return template;
    },

    /**
     *
     * @param notif {Object}
     * @return {JSX.Element|string}
     */
    overtime: (notif) => {
        let template = notif.notification_type.template;

        try {
            template = template.replace('${task}', notif.parameters.task.title);
        } catch (e) {
            return <span className="text-muted">Notification supprimée</span>;
        }

        return template;
    },
};

export default notification;
