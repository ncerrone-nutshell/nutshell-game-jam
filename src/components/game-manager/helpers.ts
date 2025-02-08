type EventDifficulty = 'easy' | 'medium' | 'hard';

export interface Event {
    name: string;
    difficulty: EventDifficulty;
}

export interface RandomEvent extends Event {
    likelihood: number;
}

const EXAMPLE_RANDOM_EVENT: RandomEvent = {
    name: 'System Refresh',
    difficulty: 'easy',
    likelihood: 0.5,
};

const RANDOM_EVENTS: RandomEvent[] = [EXAMPLE_RANDOM_EVENT];

// TODO: Scale event likelihood & difficulty based on day
export function generateRandomEvents(day: number): RandomEvent[] {
    const events = RANDOM_EVENTS.map((event) => {
        const random = Math.random();
        if (random < event.likelihood) {
            return event;
        }
    });

    return events.filter((event) => event !== undefined) as RandomEvent[];
}
