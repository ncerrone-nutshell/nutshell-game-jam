export enum EventType {
    ArjunPongRequest = 'arjun-pong-request',
    CsvImport = 'csv-import',
    AdoptionReport = 'adoption-report',
}
import { Difficulty, DIFFICULTY_DAY_THRESHOLDS } from './game-manager';
import { ActionType, GameState } from './game-manager';
export interface Event {
    user: string;
    headerText: string;
    startButtonText: string;
    timeToCompleteDuration?: number;
    type: EventType;
    penaltyScore: number;
    id: string;
    tabText: string;
    startTimestamp: number;
}

const ARJUN_PONG_REQUEST_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'Arjun',
    headerText:
        'Anyone want to play some pong? I just challenged Chris and need someone to warm me up 🏓',
    startButtonText: 'Play Pong',
    type: EventType.ArjunPongRequest,
    timeToCompleteDuration: 5,
    penaltyScore: 10,
    tabText: 'Pong',
};

const CSV_IMPORT_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'James Laurenman',
    headerText:
        'Hey can you help me fix this CSV file? This customer is totally lost',
    startButtonText: 'Open CSV',
    type: EventType.CsvImport,
    timeToCompleteDuration: 50,
    penaltyScore: 10,
    tabText: 'CSV file',
};

const ADOPTION_REPORT_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'Andy Fowler',
    headerText:
        'Is anyone using the new product? I need to know if we’re on track',
    startButtonText: 'Open Redash',
    type: EventType.AdoptionReport,
    timeToCompleteDuration: 100,
    penaltyScore: 10,
    tabText: 'Redash',
};

const RANDOM_EVENTS: Event[] = [ARJUN_PONG_REQUEST_EVENT];

const MAX_EVENT_DIFFICULTY_MAP = {
    1: 1,
    2: 2,
    3: 4,
};

const EVENT_LIKELIHOOD_DIFFICULTY_MAP = {
    1: 0.05,
    2: 0.05,
    3: 0.1,
};

export function generateRandomEvents(
    currentEvents: Event[],
    difficulty: Difficulty
): Event[] {
    console.log('difficulty', difficulty);
    console.log('currentEvents', currentEvents);

    const maxEvents = MAX_EVENT_DIFFICULTY_MAP[difficulty];

    // Do not spawn more than the max events
    if (currentEvents.length >= maxEvents) {
        return currentEvents;
    }

    let newEvents: Event[] = [...currentEvents];

    // const eventLikelihood = EVENT_LIKELIHOOD_DIFFICULTY_MAP[difficulty];
    const eventLikelihood = 1;
    for (const event of RANDOM_EVENTS) {
        if (newEvents.length >= maxEvents) {
            break;
        }

        if (Math.random() < eventLikelihood) {
            const startTimestamp = new Date().getTime();
            const eventId = crypto.randomUUID();

            newEvents.push({
                ...event,
                id: eventId,
                startTimestamp,
            });
        }
    }

    return newEvents;
}

export function getTimeLeftPercentage(event: Event): number {
    if (!event.timeToCompleteDuration) {
        return 0;
    }

    const timeToComplete = event.timeToCompleteDuration;
    const timeToCompleteMilliseconds = timeToComplete * 1000;

    const startTimestampMilliseconds = event.startTimestamp;
    const endTimestampMilliseconds =
        startTimestampMilliseconds + timeToCompleteMilliseconds;
    const currentTimeMilliseconds = new Date().getTime();
    const timeLeftMilliseconds =
        endTimestampMilliseconds - currentTimeMilliseconds;

    return timeLeftMilliseconds / timeToCompleteMilliseconds;
}

export function getNewDifficulty(
    currentDifficulty: Difficulty,
    day: number
): Difficulty {
    const dayThreshold = DIFFICULTY_DAY_THRESHOLDS[currentDifficulty];

    if (day >= dayThreshold) {
        return Math.min(Difficulty.Hard, currentDifficulty + 1);
    }

    return currentDifficulty;
}
