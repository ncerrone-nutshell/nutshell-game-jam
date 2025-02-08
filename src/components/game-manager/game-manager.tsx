import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as React from 'react';

import { App } from '../../app';

import { generateRandomEvents, RandomEvent } from './helpers';

const SPRINT_METER_MAX = 100;
const SPRINT_METER_DECAY_RATE = 5; // The rate at which the sprint meter decays per second
const DAY_TIMER = 5; // 5 seconds

export const GameManager = () => {
    // The counter for each passing day. This will progress the difficulty of the game
    const [day, setDay] = React.useState<number>(0);
    // The timer for how long a day has left
    const [dayTimer, setDayTimer] = React.useState<number>(0);

    const [eventsToday, setEventsToday] = React.useState<RandomEvent[]>([]);

    const [sprintMeterValue, setSprintMeterValue] =
        React.useState<number>(SPRINT_METER_MAX);

    useFrame((_, delta) => {
        // Decrease the day timer by the delta time
        setDayTimer((prev) => {
            if (prev <= 0) {
                setDay(day + 1);
                handleNewDay();
                return DAY_TIMER;
            }
            return prev - delta;
        });

        // Decrease the sprint meter value by the delta time
        setSprintMeterValue((prev) => {
            const newValue = prev - SPRINT_METER_DECAY_RATE * delta;
            if (newValue <= 0) {
                console.log('you lose');
            }
            return Math.max(newValue, 0);
        });
    });

    const handleNewDay = () => {
        const events = generateRandomEvents(day);
        setEventsToday(events);
    };

    const getEventsTodayString = () => {
        return (
            eventsToday.map((event) => event.name).join(', ') ||
            'No events today'
        );
    };

    return (
        <>
            <Html fullscreen>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        height: `${sprintMeterValue}%`,
                        width: '20px',
                        backgroundColor: 'blue',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        opacity: 0.5,
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        height: '100%',
                        padding: '32px',
                    }}
                >
                    <div>
                        <h1>Day {day}</h1>
                        <p>Time left: {dayTimer.toFixed(0)}</p>
                    </div>
                    <div>Events today: {getEventsTodayString()}</div>
                </div>
            </Html>
            <App />
        </>
    );
};
