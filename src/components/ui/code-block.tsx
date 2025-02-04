"use client"

import { useState } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { Copy, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  expandable?: boolean
}

export function CodeBlock({
  code,
  language = "typescript",
  title = "Code exemple",
  expandable = true
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast.success("Code copié !")
  }

  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language],
    language
  )

  return (
    <div className="rounded-lg border bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-zinc-400">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {expandable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "overflow-x-auto",
          !isExpanded && "max-h-[300px]",
          "transition-all duration-300"
        )}
      >
        <pre className="p-4 text-sm">
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className="language-typescript"
          />
        </pre>
      </div>
    </div>
  )
} 