import { useState, useCallback, useEffect } from 'react';
import { TileCoordinate } from './types';

export const useGameOfLife = (tileSize: number) => {
    const [clickedTiles, setClickedTiles] = useState(new Set<string>());
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startTile, setStartTile] = useState<TileCoordinate | null>(null);
    const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateGridSize = () => {
            const width = Math.floor(window.innerWidth / tileSize);
            const height = Math.floor(window.innerHeight / tileSize);
            setGridDimensions({ width, height });
        };

        updateGridSize();

        window.addEventListener('resize', updateGridSize);
        return () => window.removeEventListener('resize', updateGridSize);
    }, [tileSize]);

    const normalizeCoordinates = (x: number, y: number): [number, number] => {
        const normalizedX = ((x % gridDimensions.width) + gridDimensions.width) % gridDimensions.width;
        const normalizedY = ((y % gridDimensions.height) + gridDimensions.height) % gridDimensions.height;
        return [normalizedX, normalizedY];
    };

    const getNeighbors = useCallback((x: number, y: number) => {
        const neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const [nx, ny] = normalizeCoordinates(x + i, y + j);
                neighbors.push(`${nx},${ny}`);
            }
        }
        return neighbors;
    }, [gridDimensions, normalizeCoordinates]);

    const computeNextGeneration = useCallback(() => {
        const nextGeneration = new Set<string>();
        const cellsToCheck = new Set<string>();

        clickedTiles.forEach(tile => {
            cellsToCheck.add(tile);
            const [x, y] = tile.split(',').map(Number);
            getNeighbors(x, y).forEach(neighbor => cellsToCheck.add(neighbor));
        });

        cellsToCheck.forEach(cell => {
            const [x, y] = cell.split(',').map(Number);
            const neighbors = getNeighbors(x, y);
            const livingNeighbors = neighbors.filter(n => clickedTiles.has(n)).length;

            if (clickedTiles.has(cell)) {
                if (livingNeighbors === 2 || livingNeighbors === 3) {
                    nextGeneration.add(cell);
                }
            } else {
                if (livingNeighbors === 3) {
                    nextGeneration.add(cell);
                }
            }
        });

        setClickedTiles(nextGeneration);
    }, [clickedTiles, getNeighbors]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isGameRunning) {
            intervalId = setInterval(computeNextGeneration, 100);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isGameRunning, computeNextGeneration]);

    return {
        clickedTiles,
        setClickedTiles,
        isGameRunning,
        setIsGameRunning,
        isSelecting,
        setIsSelecting,
        startTile,
        setStartTile,
        tileSize,
        gridDimensions
    };
};