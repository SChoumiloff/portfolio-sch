import { PauseIcon, MixerHorizontalIcon, InfoCircledIcon, LockClosedIcon, LockOpen1Icon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface GameControlsProps {
    isGameRunning: boolean;
    setIsGameRunning: (value: boolean) => void;
    setClickedTiles: (value: Set<string>) => void;
    theme: string;
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

export const GameControls = ({
    isGameRunning,
    setIsGameRunning,
    setClickedTiles,
    theme,
    isVisible,
    setIsVisible
}: GameControlsProps) => {
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
        justifyContent: 'center',
    };


    const controls = [
        <TooltipProvider key="play-tooltip">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button 
                        onClick={() => setIsGameRunning(!isGameRunning)}
                        style={buttonStyle}
                    >
                        {isGameRunning ? <PauseIcon /> : '▶'}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isGameRunning ? 'Mettre en pause la simulation' : 'Lancer la simulation'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,

        <TooltipProvider key="clear-tooltip">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button 
                        onClick={() => setClickedTiles(new Set())}
                        style={buttonStyle}
                    >
                        ✕
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Effacer toutes les cellules</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,

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
        />,

        <TooltipProvider key="visibility-tooltip">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button 
                        onClick={() => setIsVisible(!isVisible)}
                        style={buttonStyle}
                    >
                        {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isVisible ? "Masquer la grille" : "Afficher la grille"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,
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