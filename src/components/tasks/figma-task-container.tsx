import React, { useContext } from 'react';

import './task.css';

import OrangeTriangle from '../../assets/orange-triangle.tsx';
import OrangeTarget from '../../assets/orange-target.tsx';
import { CoreTaskType } from '../game-manager/game-manager';
import BlueTriangle from '../../assets/blue-triangle.tsx';
import BlueTarget from '../../assets/blue-target.tsx';
import { GameContextForwarded } from '../layout/computer-screen-provider.tsx';
import { ActionType } from '../game-manager/game-manager';

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
    const shapeAssets = [OrangeTriangle, BlueTriangle]; // Shape assets
    const targetAssets = [OrangeTarget, BlueTarget]; // Corresponding target assets

    const shapes: ShapeData[] = [];
    const shapeTargets: ShapeTargetData[] = [];

    for (let i = 0; i < numShapes; i++) {
        const startPos = generateRandomPosition(bounds);
        const goalPos = generateRandomPosition(bounds);

        // Create shape
        shapes.push({
            id: i,
            asset: shapeAssets[i % shapeAssets.length],
            startPosition: startPos,
            startRotation: generateRandomRotation(),
            goalPosition: goalPos,
            goalRotation: generateRandomRotation(),
        });

        // Create corresponding target
        shapeTargets.push({
            id: i,
            asset: targetAssets[i % targetAssets.length],
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

    const bounds: Bounds = {
        minX: 0,
        maxX: 700,
        minY: 0,
        maxY: 400,
    };

    const handleStartClick = () => {
        const { shapes: newShapes, shapeTargets: newTargets } = generateShapes(
            2,
            bounds
        );
        setShapes([]);
        setShapeTargets([]);
        setShapes(newShapes);
        setShapeTargets(newTargets);
        setCompletedShapes([]);
        setActiveShapeId(null);
    };

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

    React.useEffect(() => {
        if (completedShapes.length === shapes.length) {
            dispatch({
                type: ActionType.CompleteTask,
                payload: {
                    type: CoreTaskType.Figma,
                    score: 1,
                },
            });
        }
    }, [completedShapes, shapes.length]);

    return (
        <div className="figma-task-container">
            <button
                className="task-button figma"
                onClick={() => {
                    handleStartClick();
                }}
            >
                Start!
            </button>

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
        </div>
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
                        return newRotation % 360;
                    });
                    break;
                case 'a':
                    setRotation((prev) => {
                        const newRotation = prev - rotateBy;
                        const rotationMod = newRotation % 360;
                        return rotationMod == -0 ? 0 : rotationMod;
                    });
                    break;
            }
        },
        [props.isActive, moveBy, rotateBy]
    );

    const checkIfAtGoal = React.useCallback(() => {
        const atGoal =
            position.x === props.positionGoal.x &&
            position.y === props.positionGoal.y &&
            rotation === props.rotationGoal;
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
            style={{ transformOrigin: 'center', position: 'absolute' }}
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
            style={{ transformOrigin: 'center', position: 'absolute' }}
        />
    );
}
