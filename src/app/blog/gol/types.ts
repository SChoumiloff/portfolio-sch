export interface TileCoordinate {
    x: number;
    y: number;
}

export interface GameState {
    clickedTiles: Set<string>;
    isGameRunning: boolean;
    showInfo: boolean;
}