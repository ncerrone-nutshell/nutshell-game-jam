import { useState } from 'react';
import { BrowserHeader } from './browser-header';
import { ConsoleContainer } from './console-container';
import { ConsoleContentItemType } from './console-content';
import { TaskContainer } from './task-container';

import './computer-screen.css';

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export function ComputerScreen() {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Coding);

    return (
        <div className="screen-container">
            <div className="container">
                <BrowserHeader
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
                <div className="content">
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
