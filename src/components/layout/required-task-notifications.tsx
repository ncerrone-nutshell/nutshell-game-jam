import './required-task-notifications.css';

import './computer-screen.css';
import { useContext } from 'react';
import { RequiredTaskNotification } from './required-task-notification';
import { GameContextForwarded } from './computer-screen-provider';

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export function RequiredTaskNotifications() {
    const { events } = useContext(GameContextForwarded);

    return (
        <div className="required-task-notifications">
            {events.map((event) => {
                return (
                    <RequiredTaskNotification key={event.id} event={event} />
                );
            })}
        </div>
    );
}
