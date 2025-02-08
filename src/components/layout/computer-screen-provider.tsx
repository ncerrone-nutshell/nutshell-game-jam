// We need to re-delcare context because drei does not forward context through HTML

import { createContext } from 'react';
import { GameContextType } from '../game-manager/game-manager';

// TODO: figure out why we cant set a default value
export const GameContextForwarded = createContext<GameContextType>(null);

// Takes the context from outside of the HTML and forwards it to the context provider
export function ComputerScreenProvider({
    children,
    gameContext,
}: {
    children: React.ReactNode;
    gameContext: GameContextType;
}) {
    return (
        <GameContextForwarded.Provider value={gameContext}>
            {children}
        </GameContextForwarded.Provider>
    );
}
