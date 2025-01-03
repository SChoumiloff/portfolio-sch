import { PauseIcon, MixerHorizontalIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import styles from '../Layout.module.css';
import { patterns, generatePattern } from './patterns';
import React from "react";
import { PatternSelect } from "./pattern-select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileControls } from "./mobile-controls";

interface GameControlsProps {
    isGameRunning: boolean;
    setIsGameRunning: (value: boolean) => void;
    setClickedTiles: (value: Set<string>) => void;
    showInfo: boolean;
    setShowInfo: (value: boolean) => void;
    theme: string;
}

export const GameControls = ({
    isGameRunning,
    setIsGameRunning,
    setClickedTiles,
    showInfo,
    setShowInfo,
    theme
}: GameControlsProps) => {
    const [showPatterns, setShowPatterns] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const buttonStyle = {
        width: '25px',
        height: '25px',
        backgroundColor: theme === 'dark' ? 'white' : 'black',
        color: theme === 'dark' ? 'black' : 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const menuStyle = {
        position: 'absolute' as const,
        bottom: '40px',
        backgroundColor: theme === 'dark' ? 'white' : 'black',
        color: theme === 'dark' ? 'black' : 'white',
        borderRadius: '8px',
        padding: '8px',
        display: showPatterns ? 'flex' : 'none',
        flexDirection: 'column' as const,
        gap: '8px',
        minWidth: '150px'
    };

    const infoMenuStyle = {
        position: 'absolute' as const,
        bottom: '40px',
        backgroundColor: theme === 'dark' ? 'white' : 'black',
        color: theme === 'dark' ? 'black' : 'white',
        borderRadius: '8px',
        padding: '12px',
        display: showInfo ? 'block' : 'none',
        minWidth: '200px',
        fontSize: '14px',
        lineHeight: '1.5'
    };

    const menuItemStyle = {
        padding: '4px 8px',
        cursor: 'pointer',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: theme === 'dark' ? '#eee' : '#333'
        }
    };

    const controls = [
        <div key="play" style={{ position: 'relative' }}>
            <button 
                onClick={() => setIsGameRunning(!isGameRunning)}
                style={buttonStyle}
            >
                {isGameRunning ? <PauseIcon /> : '▶'}
            </button>
        </div>,
        <button 
            key="clear"
            onClick={() => setClickedTiles(new Set())}
            style={buttonStyle}
        >
            ✕
        </button>,
        <Popover key="info">
            <PopoverTrigger asChild>
                <Button 
                    variant="outline"
                    className="w-[25px] h-[25px] p-0"
                    style={buttonStyle}
                >
                    <InfoCircledIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[400px] space-y-4" 
                align="start"
                sideOffset={5}
            >
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        🎮 Le Jeu de la Vie
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                        🧬 Un automate cellulaire fascinant créé par John Conway en 1970, qui simule l&apos;évolution de cellules selon des règles simples.
                    </p>

                    <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                            📋 Règles du jeu
                        </h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span>🌱</span>
                                <span>Naissance : Une cellule morte avec exactement 3 voisines vivantes naît</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>💪</span>
                                <span>Survie : Une cellule vivante avec 2 ou 3 voisines vivantes survit</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>💀</span>
                                <span>Mort : Dans tous les autres cas, la cellule meurt</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                            🎯 Comment jouer
                        </h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span>🖱️</span>
                                <span>Cliquez sur les cellules pour les activer/désactiver</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>▶️</span>
                                <span>Utilisez le bouton play/pause pour contrôler la simulation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>🔄</span>
                                <span>Générez des patterns prédéfinis avec le menu patterns</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                        <h4 className="text-sm font-medium">📚 Pour en savoir plus</h4>
                        <div className="grid gap-2">
                            <a 
                                href="https://fr.wikipedia.org/wiki/Jeu_de_la_vie"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm underline text-muted-foreground hover:text-primary inline-flex items-center gap-2"
                            >
                                <span>📖</span>
                                <span>Wikipedia - Jeu de la Vie</span>
                            </a>
                            <a 
                                href="https://conwaylife.com/wiki"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm underline text-muted-foreground hover:text-primary inline-flex items-center gap-2"
                            >
                                <span>🌐</span>
                                <span>LifeWiki - Patterns et plus</span>
                            </a>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>,
        <PatternSelect 
            key="patterns"
            onSelect={setClickedTiles}
            buttonStyle={buttonStyle}
        />
    ];

    if (isMobile) {
        return (
            <div className={styles.controls} style={{ 
                position: 'fixed', 
                bottom: '30px', 
                left: '20px', 
                zIndex: 1000
            }}>
                <MobileControls isOpen={isOpen} setIsOpen={setIsOpen}>
                    {controls}
                </MobileControls>
            </div>
        );
    }

    return (
        <div className={styles.controls} style={{ 
            position: 'fixed', 
            bottom: '20px', 
            left: '20px', 
            zIndex: 1000,
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
        }}>
            {controls}
        </div>
    );
};