interface InfoPanelProps {
    show: boolean;
    theme: string;
}

export const InfoPanel = ({ show, theme }: InfoPanelProps) => {
    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            left: '20px',
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
            color: theme === 'dark' ? 'black' : 'white',
            padding: '15px',
            borderRadius: '8px',
            maxWidth: '300px',
            zIndex: 1000
        }}>
            <h3>Game of Life Rules:</h3>
            <ul>
                <li>Any live cell with 2 or 3 neighbors survives</li>
                <li>Any dead cell with exactly 3 neighbors becomes alive</li>
                <li>All other cells die or stay dead</li>
            </ul>
        </div>
    );
};