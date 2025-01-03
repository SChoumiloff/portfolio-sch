import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { patterns, generatePattern } from "./patterns"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

interface PatternSelectProps {
    onSelect: (tiles: Set<string>) => void;
    buttonStyle?: React.CSSProperties;
}

export function PatternSelect({ onSelect, buttonStyle }: PatternSelectProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[25px] h-[25px] p-0"
                    style={buttonStyle}
                    title="Générer un pattern"
                >
                    <MixerHorizontalIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput 
                        placeholder="Rechercher un pattern..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>Aucun pattern trouvé.</CommandEmpty>
                        {Object.entries(patterns).map(([categoryKey, category]) => (
                            <CommandGroup key={categoryKey} heading={category.name}>
                                {Object.entries(category.patterns).map(([patternKey, pattern]) => (
                                    <CommandItem
                                        key={patternKey}
                                        value={pattern.name}
                                        onSelect={() => {
                                            onSelect(generatePattern(pattern.coordinates));
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-2 py-1.5"
                                    >
                                        <span className="flex-shrink-0 w-5 text-center">
                                            {pattern.emoji}
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <span className="font-medium">
                                                {pattern.name}
                                            </span>
                                            {pattern.description && (
                                                <span className="text-xs text-muted-foreground">
                                                    {pattern.description}
                                                </span>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
} 