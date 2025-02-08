type EventDifficulty = 'easy' | 'medium' | 'hard';

interface Event {
    name: string;
    difficulty: EventDifficulty;
}

interface RandomEvent extends Event {
    likelihood: number;
}

const EXAMPLE_RANDOM_EVENT: RandomEvent = {
    name: 'System Refresh',
    difficulty: 'easy',
    likelihood: 0.5,
};

const RANDOM_EVENTS: RandomEvent[] = [EXAMPLE_RANDOM_EVENT];

export function generateRandomEvents(day: number) {
    const events = RANDOM_EVENTS.map((event) => {
        const random = Math.random();
        if (random < event.likelihood) {
            return event;
        }
        return;
    });
    return events;
}
