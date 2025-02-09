import { useContext, useState } from 'react';
import { BrowserHeader } from './browser-header';
import { ConsoleContainer } from './console-container';
import { ConsoleContentItemType } from './console-content';
import { TaskContainer } from './task-container';
import { RequiredTaskNotifications } from './required-task-notifications';

import { SHOW_CONSOLE } from '../../main';
import './computer-screen.css';
import { GameContextForwarded } from './computer-screen-provider';
import { Login } from './login';
import { ActionType, GameStatus } from '../game-manager/game-manager';
import { LostScreen } from './lost';

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export function ComputerScreen() {
    const { status, dispatch } = useContext(GameContextForwarded);

    const [activeTab, setActiveTab] = useState<Tab>(Tab.Coding);

    if (status === GameStatus.NotStarted) {
        return <Login />;
    }

    if (status === GameStatus.Lost) {
        return <LostScreen />;
    }

    return (
        <div
            className="screen-container"
            onMouseEnter={() =>
                dispatch({
                    type: ActionType.SetScreenFocus,
                    payload: { isScreenFocused: true },
                })
            }
            onMouseLeave={() =>
                dispatch({
                    type: ActionType.SetScreenFocus,
                    payload: { isScreenFocused: false },
                })
            }
        >
            <div className="container">
                <BrowserHeader
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
                <div className="content-container">
                    <div className="content">
                        <RequiredTaskNotifications />
                        <TaskContainer activeTab={activeTab} />
                    </div>
                    {SHOW_CONSOLE && (
                        <ConsoleContainer
                            onTriggerEvent={(type: ConsoleContentItemType) => {
                                console.log(type);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
