'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import { useGameOfLife } from './gol/usegol';
import { GameGrid } from './gol/grid';
import { GameControls } from './gol/gol-controls';
import { InfoPanel } from './gol/gol-infos';
import styles from './Layout.module.css';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const TILE_SIZE = 10;

    const {
        clickedTiles,
        setClickedTiles,
        isGameRunning,
        setIsGameRunning,
        isSelecting,
        setIsSelecting,
        setStartTile,
    } = useGameOfLife(TILE_SIZE);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const gridPattern = e.currentTarget.querySelector(`.${styles.gridPattern}`);
        if (!gridPattern) return;
        
        const rect = gridPattern.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
        const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);
    
        const tileKey = `${x},${y}`;
        setClickedTiles((prev) => {
            const newSet = new Set(prev);
            newSet.add(tileKey);
            return newSet;
        });
    
        setIsSelecting(true);
        setStartTile({ x, y });
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isSelecting) return;
    
        const gridPattern = e.currentTarget.querySelector(`.${styles.gridPattern}`);
        if (!gridPattern) return;
        
        const rect = gridPattern.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
        const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);
    
        const tileKey = `${x},${y}`;
        setClickedTiles((prev) => {
            const newSet = new Set(prev);
            newSet.add(tileKey);
            return newSet;
        });
    };

    return (
        <div 
            className={styles.pageContainer}
            style={{
                '--grid-color': resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                '--margin-color': resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                '--accent-color': resolvedTheme === 'dark' ? '#ffffff' : '#000000',
                '--content-color': resolvedTheme === 'dark' ? '#ffffff' : '#000000',
                '--tile-size': `${TILE_SIZE}px`
            } as React.CSSProperties}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsSelecting(false)}
        >
            <GameControls 
                isGameRunning={isGameRunning}
                setIsGameRunning={setIsGameRunning}
                setClickedTiles={setClickedTiles}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                theme={resolvedTheme || 'light'}
            />
            
            <GameGrid 
                clickedTiles={clickedTiles}
                tileSize={TILE_SIZE}
                resolvedTheme={resolvedTheme || 'light'}
            />

            <div className={styles.contentWrapper} style={{ color: 'var(--content-color)' }}>
                {children}
            </div>
        </div>
    );
}