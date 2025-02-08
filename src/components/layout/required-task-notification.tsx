import './required-task-notification.css';

import { Event } from '../game-manager/helpers';
import SlackMark from '../../icons/slack';
import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { ActionType } from '../game-manager/game-manager';
import { getTimeLeftPercentage } from '../game-manager/helpers';
export function RequiredTaskNotification(props: { event: Event }) {
    const { dispatch } = useContext(GameContextForwarded);

    let timeLeftPercentage = 1;
    if (props.event.timeToCompleteDuration) {
        timeLeftPercentage = getTimeLeftPercentage(props.event);
    }

    return (
        <div
            className="required-task-notification"
            onClick={() => {
                dispatch({
                    type: ActionType.StartRequiredTask,
                    payload: {
                        task: props.event,
                    },
                });
            }}
        >
            <div className="required-task-notification-progress-bar">
                <div
                    className="required-task-notification-progress-bar-fill"
                    style={{
                        width: `${timeLeftPercentage * 100}%`,
                    }}
                ></div>
            </div>
            <div className="required-task-notification-content-container">
                <div className="required-task-notification-icon">
                    <SlackMark width={32} height={32} />
                </div>
                <div className="required-task-notification-content">
                    <div className="required-task-notification-user">
                        {props.event.user}
                    </div>
                    <div className="required-task-notification-header">
                        {props.event.headerText}
                    </div>
                </div>
            </div>
            <div className="required-task-notification-button">
                {props.event.startButtonText}
            </div>
        </div>
    );
}
