export const parseRLE = (rle: string): number[][] => {
    const result: number[][] = [];
    let currentX = 0;
    let currentY = 0;
    
    const pattern = rle.split('\n')
        .filter(line => !line.startsWith('#') && !line.startsWith('x'))
        .join('')
        .replace('!', '');
    
    let count = '';
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        
        if (char >= '0' && char <= '9') {
            count += char;
            continue;
        }
        
        const repeat = count === '' ? 1 : parseInt(count);
        count = '';
        
        switch (char) {
            case 'b':
                currentX += repeat;
                break;
            case 'o':
                for (let j = 0; j < repeat; j++) {
                    result.push([currentX + j, currentY]);
                }
                currentX += repeat;
                break;
            case '$':
                currentY += repeat;
                currentX = 0;
                break;
        }
    }
    
    return result;
};

const loaferPattern = `14bobo7bobo$3b2o11bo7bo11b2o$5bo10b2o5b2o10bo$bo2bo5bob3o2b3ob3o2b3obo5bo2bo$o8bob3o3bobobobo3b3obo8bo$b3obo6bo6bobo6bo6bob3o$5b5o3b2ob3o3b3ob2o3b5o$7bo6bo11bo6bo!`;
const V232P7H3V0 = `20b3o9b3o$20bo2bo7bo2bo$19b2o13b2o$17b2obo3bo5bo3bob2o$20b3ob2o3b2ob3o
                    $16bo21bo$17bobob5o3b5obobo$17bo3bo2b2o3b2o2bo3bo$17bo3b3o7b3o3bo$17bo
                    4bo9bo4bo$21b3o7b3o$20bo2b2o5b2o2bo$23b2o5b2o$19b2o4bo3bo4b2o$18bo3bo
                    3bobo3bo3bo$15b2ob3obobobobobobob3ob2o$14bo5b2o4bobo4b2o5bo$13bo4b2o
                    15b2o4bo$13b3o8bo5bo8b3o$22b2o7b2o$23bo2bobo2bo$15bo8b2o3b2o8bo$12bo3b
                    o7bo5bo7bo3bo$15bo23bo$10b2o31b2o$9bo2b2o27b2o2bo$9b2o2bo27bo2b2o$10b
                    2o2bo25bo2b2o$11bobo27bobo2$9b3o31b3o$9bo35bo$7b2o2bo31bo2b2o$6b2o39b
                    2o$5bo2bo37bo2bo$4b2o43b2o$3bo47bo$3b3o43b3o$4b2o43b2o2$5bobo39bobo$5b
                    obo39bobo2$5b2o4bo7bo7bo7bo7bo4b2o$3bo6bobo5bobo5bobo5bobo5bobo6bo$b2o
                    2bo3b2ob2o3b2ob2o3b2ob2o3b2ob2o3b2ob2o3bo2b2o$bo3bo3bo11bo3bo11bo3bo7b
                    o3bo$o2bo47bo2bo$o2bo47bo2bo$b2o49b2o$8bobo9bo5bo9bo5bo$9bo11bo3bo11bo
                    3bo!`
export interface Pattern {
    coordinates: number[][];
    name: string;
    emoji: string;
    description?: string;
}

export interface PatternCategory {
    name: string;
    patterns: Record<string, Pattern>;
}

export const patterns: Record<string, PatternCategory> = {
    spaceships: {
        name: "Vaisseaux",
        patterns: {
            glider: {
                name: "Planeur",
                emoji: "✈️",
                coordinates: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
                description: "Le plus simple des vaisseaux"
            },
            LWSS: {
                name: "Vaisseau léger",
                emoji: "🛸",
                coordinates: [
                    [0, 1], [0, 2], [0, 3], [0, 4],
                    [1, 0], [1, 4],
                    [2, 4],
                    [3, 0], [3, 3]
                ],
                description: "Un vaisseau plus complexe"
            },
            V232P7H3V0: {
                        name: "V232P7H3V0",
                        emoji: "🚀",
                        coordinates: parseRLE(V232P7H3V0),
                        description: "Le plus petit vaisseau connu se déplaçant à une vitesse de 3 cases toutes les 7 générations"
                    }
        }
    },
    oscillators: {
        name: "Oscillateurs",
        patterns: {
            blinker: {
                name: "Clignotant",
                emoji: "💫",
                coordinates: [[0, 0], [1, 0], [2, 0]],
                description: "Le plus simple des oscillateurs"
            },
            beacon: {
                name: "Balise",
                emoji: "🔆",
                coordinates: [
                    [0, 0], [0, 1], [1, 0], [1, 1],
                    [2, 2], [2, 3], [3, 2], [3, 3]
                ],
                description: "Un oscillateur période 2"
            },
            butterfly: {
                name: "Papillon",
                emoji: "🦋",
                coordinates: parseRLE(loaferPattern),
                description: "Un oscillateur complexe"
            }
        }
    },
    guns: {
        name: "Canons",
        patterns: {
            gosperGliderGun: {
                name: "Canon Gosper",
                emoji: "🚀",
                coordinates: [
                    [0, 4], [0, 5], [1, 4], [1, 5],
                    [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8],
                    [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5],
                    [16, 6], [17, 5],
                    [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1],
                    [22, 5], [24, 0], [24, 1], [24, 5], [24, 6],
                    [34, 2], [34, 3], [35, 2], [35, 3]
                ],
                description: "Le premier canon à planeurs découvert"
            }
        }
    }
};

export const generatePattern = (coordinates: number[][], offsetX: number = 10, offsetY: number = 10): Set<string> => {
    const newTiles = new Set<string>();
    coordinates.forEach(([x, y]) => {
        newTiles.add(`${x + offsetX},${y + offsetY}`);
    });
    return newTiles;
}; 