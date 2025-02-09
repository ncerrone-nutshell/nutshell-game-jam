import './required-task-notification.css';

import { Event } from '../game-manager/helpers';
import SlackMark from '../../icons/slack';
import { useContext, useEffect } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { ActionType } from '../game-manager/game-manager';
import { getTimeLeftPercentage } from '../game-manager/helpers';

export function RequiredTaskNotification(props: { event: Event }) {
    const { dispatch } = useContext(GameContextForwarded);

    let timeLeftPercentage = 1;

    if (props.event.timeToCompleteDuration) {
        timeLeftPercentage = getTimeLeftPercentage(props.event);
    }

    useEffect(() => {
        if (!props.event.timeToCompleteDuration) {
            return;
        }

        const timeout = setTimeout(() => {
            dispatch({
                type: ActionType.StartRequiredTask,
                payload: {
                    task: props.event,
                    success: false,
                },
            });
        }, props.event.timeToCompleteDuration * 1000);

        // if the component is unmounted, do not reduce the score
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return (
        <div
            className="required-task-notification"
            onClick={() => {
                dispatch({
                    type: ActionType.StartRequiredTask,
                    payload: {
                        task: props.event,
                        success: true,
                    },
                });
            }}
        >
            <div className="required-task-notification-progress-bar">
                <div
                    className="required-task-notification-progress-bar-fill"
                    style={{
                        width: `${timeLeftPercentage * 100}%`,
                        backgroundColor: `rgb(${
                            255 * (1 - timeLeftPercentage)
                        }, ${46 * timeLeftPercentage}, ${
                            136 * timeLeftPercentage
                        })`,
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
