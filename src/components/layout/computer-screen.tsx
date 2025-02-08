import { useEffect, useState } from 'react'
import { BrowserHeader } from './browser-header'
import { ScoreContainer } from './score-container'
import { ConsoleContainer } from './console-container'
import { ConsoleContentItemType } from './console-content'
import { TaskContainer } from './task-container'

import './computer-screen.css'

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
}

export function ComputerScreen() {
    const [score, setScore] = useState<number>(0)
    const [life, setLife] = useState<number>(100)
    const [days, setDays] = useState<number>(1)
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Coding)

    useEffect(() => {
        const lifeInterval = setInterval(() => {
            if (life > 0) {
                setLife(life - 1)
            }
        }, 1000)

        const daysInterval = setInterval(() => {
            setDays(days + 1)
        }, 5000)

        return () => {
            clearInterval(lifeInterval)
            clearInterval(daysInterval)
        }
    }, [life, days])

    return (
        <div className="screen-container">
            <div className="container">
                <BrowserHeader
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
                <div className="content">
                    <TaskContainer
                        activeTab={activeTab}
                        onComplete={() => {
                            setScore(score + 1)
                        }}
                    />
                    <ConsoleContainer
                        onTriggerEvent={(type: ConsoleContentItemType) => {
                            console.log(type)
                        }}
                        score={score}
                        life={life}
                        days={days}
                    />
                </div>
            </div>
        </div>
    )
}
