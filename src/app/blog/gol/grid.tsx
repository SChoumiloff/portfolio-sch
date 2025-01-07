import styles from '../Layout.module.css';

interface GameGridProps {
    clickedTiles: Set<string>;
    tileSize: number;
    resolvedTheme: string;
    isDisabled: boolean;
    isVisible: boolean;
    gridDimensions: { width: number; height: number };
}

export const GameGrid = ({ clickedTiles, tileSize, resolvedTheme, isDisabled, isVisible, gridDimensions }: GameGridProps) => {

    return (
        <div 
            style={{
                width: gridDimensions.width * tileSize,
                height: gridDimensions.height * tileSize,
                pointerEvents: isDisabled ? 'none' : 'auto',
                opacity: isDisabled ? 0.7 : 1,
                display: isVisible ? 'block' : 'none'
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