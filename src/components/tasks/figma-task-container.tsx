import React, { useContext } from 'react';

import './figma-task-container.css';

import NutshellIcon from '../../icons/figma-task/nutshell';
import NutshellOutlineIcon from '../../icons/figma-task/nutshell-outline';
import SquirrelIcon from '../../icons/figma-task/squirrel';
import SquirrelOutlineIcon from '../../icons/figma-task/squirrel-outline';
import PersonIcon from '../../icons/figma-task/person';
import PersonOutlineIcon from '../../icons/figma-task/person-outline';
import CompanyIcon from '../../icons/figma-task/company';
import CompanyOutlineIcon from '../../icons/figma-task/company-outline';

import { CoreTaskType } from '../game-manager/game-manager';
import { GameContextForwarded } from '../layout/computer-screen-provider.tsx';
import { ActionType } from '../game-manager/game-manager';
import { COMPLETE_TASK_EVENT } from '../layout/console-content.tsx';
import { DEV_MODE } from '../../main.tsx';
import { TaskControls } from './figma/task-controls.tsx';
import { TaskCompleted } from './task-completed.tsx';

interface ShapeData {
    id: number;
    asset: React.ComponentType<any>;
    startPosition: { x: number; y: number };
    startRotation: number;
    goalPosition: { x: number; y: number };
    goalRotation: number;
}

interface ShapeTargetData {
    id: number;
    asset: React.ComponentType<any>;
    positionGoal: { x: number; y: number };
    rotationGoal: number;
}

interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

function generateRandomPosition(bounds: Bounds) {
    const moveBy = 15;
    return {
        x:
            Math.floor(Math.random() * ((bounds.maxX - bounds.minX) / moveBy)) *
                moveBy +
            bounds.minX,
        y:
            Math.floor(Math.random() * ((bounds.maxY - bounds.minY) / moveBy)) *
                moveBy +
            bounds.minY,
    };
}

function generateRandomRotation() {
    return Math.floor(Math.random() * 24) * 15;
}

function generateShapes(
    numShapes: number,
    bounds: Bounds
): { shapes: ShapeData[]; shapeTargets: ShapeTargetData[] } {
    const shapeAssets = [NutshellIcon, SquirrelIcon, PersonIcon, CompanyIcon]; // Shape assets
    const targetAssets = [
        NutshellOutlineIcon,
        SquirrelOutlineIcon,
        PersonOutlineIcon,
        CompanyOutlineIcon,
    ]; // Corresponding target assets

    const shapes: ShapeData[] = [];
    const shapeTargets: ShapeTargetData[] = [];
    var usedIndices: number[] = [];

    for (let i = 0; i < numShapes; i++) {
        const startPos = generateRandomPosition(bounds);
        const goalPos = generateRandomPosition(bounds);

        var randomShapeIndex = 0;
        do {
            randomShapeIndex = Math.floor(Math.random() * shapeAssets.length);
        } while (usedIndices.includes(randomShapeIndex));

        usedIndices.push(randomShapeIndex);

        // Create shape
        shapes.push({
            id: i,
            asset: shapeAssets[randomShapeIndex],
            startPosition: startPos,
            startRotation: generateRandomRotation(),
            goalPosition: goalPos,
            goalRotation: generateRandomRotation(),
        });

        // Create corresponding target
        shapeTargets.push({
            id: i,
            asset: targetAssets[randomShapeIndex],
            positionGoal: goalPos,
            rotationGoal: shapes[i].goalRotation, // Use same rotation as shape's goal
        });
    }

    return { shapes, shapeTargets };
}

export function FigmaTaskContainer() {
    const { dispatch } = useContext(GameContextForwarded);
    const [activeShapeId, setActiveShapeId] = React.useState<number | null>(
        null
    );
    const [completedShapes, setCompletedShapes] = React.useState<number[]>([]);
    const [shapes, setShapes] = React.useState<ShapeData[]>([]);
    const [shapeTargets, setShapeTargets] = React.useState<ShapeTargetData[]>(
        []
    );
    const [taskCompleted, setTaskCompleted] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleCompleteTask = () => {
            if (DEV_MODE) {
                handleTaskCompleted();
            }
        };

        window.addEventListener(COMPLETE_TASK_EVENT, handleCompleteTask);

        return () => {
            window.removeEventListener(COMPLETE_TASK_EVENT, handleCompleteTask);
        };
    }, []);

    const bounds: Bounds = {
        minX: 0,
        maxX: 1300,
        minY: 0,
        maxY: 600,
    };

    React.useEffect(() => {
        generateNewMockup();
    }, []);

    const generateNewMockup = React.useCallback(() => {
        const { shapes: newShapes, shapeTargets: newTargets } = generateShapes(
            2,
            bounds
        );

        setShapes(newShapes);
        setShapeTargets(newTargets);
        setCompletedShapes([]);
        setActiveShapeId(null);
    }, [bounds]);

    const handleShapeAtGoal = (shapeId: number, isAtGoal: boolean) => {
        setCompletedShapes((prev) => {
            if (isAtGoal && !prev.includes(shapeId)) {
                return [...prev, shapeId];
            } else if (!isAtGoal && prev.includes(shapeId)) {
                return prev.filter((id) => id !== shapeId);
            }
            return prev;
        });
    };

    const handleTaskCompleted = () => {
        setTaskCompleted(true);
        setTimeout(() => {
            dispatch({
                type: ActionType.CompleteTask,
                payload: {
                    type: CoreTaskType.Figma,
                    score: 100,
                },
            });
            setCompletedShapes([]);
            setShapes([]);
            setShapeTargets([]);
            generateNewMockup();
            setTaskCompleted(false);
        }, 1000);
    };

    React.useEffect(() => {
        if (
            completedShapes.length === shapes.length &&
            shapes.length > 0 &&
            !taskCompleted
        ) {
            handleTaskCompleted();
        }
    }, [completedShapes, shapes.length, generateNewMockup]);

    return !taskCompleted ? (
        <div className="figma-task-container">
            <div className="figma-task-container-shapes">
                {shapes.map((shape, index) => (
                    <React.Fragment
                        key={`${shape.id}-${shape.startPosition.x}-${shape.startPosition.y}`}
                    >
                        <ShapeTarget
                            asset={shapeTargets[index].asset}
                            positionGoal={shapeTargets[index].positionGoal}
                            rotationGoal={shapeTargets[index].rotationGoal}
                        />
                        <Shape
                            asset={shape.asset}
                            isActive={activeShapeId === shape.id}
                            position={shape.startPosition}
                            rotation={shape.startRotation}
                            positionGoal={shape.goalPosition}
                            rotationGoal={shape.goalRotation}
                            onClick={() => {
                                setActiveShapeId(shape.id);
                            }}
                            onAtGoal={handleShapeAtGoal}
                            shapeId={shape.id}
                        />
                    </React.Fragment>
                ))}
            </div>
            <TaskControls />
        </div>
    ) : (
        <TaskCompleted />
    );
}

type ShapeProps = {
    asset: React.ComponentType<any>;
    isActive: boolean;
    position: { x: number; y: number };
    rotation: number;
    positionGoal: { x: number; y: number };
    rotationGoal: number;
    onClick: () => void;
    onAtGoal: (shapeId: number, isAtGoal: boolean) => void;
    shapeId: number;
};

function Shape(props: ShapeProps) {
    const Asset = props.asset;
    const [position, setPosition] = React.useState(props.position);
    const [rotation, setRotation] = React.useState(props.rotation);

    const moveBy = 15;
    const rotateBy = 15;

    const handleKeyDown = React.useCallback(
        (e: KeyboardEvent) => {
            if (!props.isActive) return;

            switch (e.key) {
                case 'ArrowUp':
                    setPosition((prev) => ({ ...prev, y: prev.y - moveBy }));
                    break;
                case 'ArrowDown':
                    setPosition((prev) => ({ ...prev, y: prev.y + moveBy }));
                    break;
                case 'ArrowLeft':
                    setPosition((prev) => ({ ...prev, x: prev.x - moveBy }));
                    break;
                case 'ArrowRight':
                    setPosition((prev) => ({ ...prev, x: prev.x + moveBy }));
                    break;
                case 'd':
                    setRotation((prev) => {
                        const newRotation = prev + rotateBy;
                        return ((newRotation % 360) + 360) % 360;
                    });
                    break;
                case 'a':
                    setRotation((prev) => {
                        // For counterclockwise rotation, subtract but keep result positive
                        const newRotation = prev - rotateBy;
                        // Add 360 before modulo to handle negative numbers
                        return ((newRotation % 360) + 360) % 360;
                    });
                    break;
            }
        },
        [props.isActive, moveBy, rotateBy]
    );

    const checkIfAtGoal = React.useCallback(() => {
        const atGoal =
            Math.abs(position.x - props.positionGoal.x) <= 5 &&
            Math.abs(position.y - props.positionGoal.y) <= 5 &&
            // Fixes an issue where negative roations were not being check correctly
            (Math.abs(rotation - props.rotationGoal) <= 5 ||
                Math.abs(rotation + 360 - props.rotationGoal) <= 5);
        props.onAtGoal(props.shapeId, atGoal);

        return atGoal;
    }, [
        position,
        rotation,
        props.positionGoal,
        props.rotationGoal,
        props.onAtGoal,
    ]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    React.useEffect(() => {
        checkIfAtGoal();
    }, [position, rotation, checkIfAtGoal]);

    // Reset position and rotation when props change
    React.useEffect(() => {
        setPosition(props.position);
        setRotation(props.rotation);
    }, [props.position, props.rotation]);

    return (
        <Asset
            transform={`translate(${position.x} ${position.y}) rotate(${rotation})`}
            onClick={props.onClick}
            style={{
                transformOrigin: 'center',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            width={150}
            height={150}
            opacity={props.isActive ? 1 : 0.5}
        />
    );
}

type ShapeTargetProps = {
    asset: React.ComponentType<any>;
    positionGoal: { x: number; y: number };
    rotationGoal: number;
};

function ShapeTarget(props: ShapeTargetProps) {
    const Asset = props.asset;

    return (
        <Asset
            transform={`translate(${props.positionGoal.x} ${props.positionGoal.y}) rotate(${props.rotationGoal} )`}
            style={{
                transformOrigin: 'center',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            width={150}
            height={150}
        />
    );
}
