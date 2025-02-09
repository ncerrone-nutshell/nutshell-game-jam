import { useContext, useState } from 'react';
import { BrowserHeader } from './browser-header';
import { ConsoleContainer } from './console-container';
import { ConsoleContentItemType } from './console-content';
import { TaskContainer } from './task-container';
import { RequiredTaskNotifications } from './required-task-notifications';

import './computer-screen.css';
import { GameContextForwarded } from './computer-screen-provider';
import { Login } from './login';
import { GameStatus } from '../game-manager/game-manager';
import { LostScreen } from './lost';

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export function ComputerScreen() {
    const { status } = useContext(GameContextForwarded);

    const [activeTab, setActiveTab] = useState<Tab>(Tab.Coding);

    if (status === GameStatus.NotStarted) {
        return <Login />;
    }

    if (status === GameStatus.Lost) {
        return <LostScreen />;
    }

    return (
        <div className="screen-container">
            <div className="container">
                <BrowserHeader
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
                <div className="content">
                    <RequiredTaskNotifications />
                    <TaskContainer activeTab={activeTab} />
                    <ConsoleContainer
                        onTriggerEvent={(type: ConsoleContentItemType) => {
                            console.log(type);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
