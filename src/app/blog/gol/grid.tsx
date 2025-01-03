import { CSSProperties } from 'react';
import styles from '../Layout.module.css';
import { useGameOfLife } from './usegol';

interface GameGridProps {
    clickedTiles: Set<string>;
    tileSize: number;
    resolvedTheme: string;
}

export const GameGrid = ({ clickedTiles, tileSize, resolvedTheme }: GameGridProps) => {
    const { gridDimensions } = useGameOfLife(tileSize);

    return (
        <div 
            style={{
                width: gridDimensions.width * tileSize,
                height: gridDimensions.height * tileSize,
            }}
            className={styles.gridPattern}
        >
            {Array.from(clickedTiles).map((key) => {
                const [x, y] = key.split(',').map(Number);
                return (
                    <div
                        key={key}
                        className={styles.activeTile}
                        style={{
                            top: y * tileSize + 1 + 'px',
                            left: x * tileSize + 2 + 'px',
                            width: tileSize - 3 + 'px',
                            height: tileSize - 3 + 'px',
                            position: 'absolute',
                            backgroundColor: resolvedTheme === 'dark' ? '#ffffff' : '#000000',
                        }}
                    />
                );
            })}
        </div>
    );
};