"use client"

import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"

// Schéma pour une structure de commentaires imbriqués
const commentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number(),
    author: z.string(),
    content: z.string(),
    createdAt: z.string().datetime(),
    replies: z.array(commentSchema).default([]),
  })
)

type Comment = z.infer<typeof commentSchema>

const sampleData = {
  id: 1,
  author: "Alice",
  content: "Super article !",
  createdAt: "2024-03-21T10:00:00Z",
  replies: [
    {
      id: 2,
      author: "Bob",
      content: "Totalement d'accord !",
      createdAt: "2024-03-21T10:30:00Z",
      replies: [
        {
          id: 3,
          author: "Alice",
          content: "Merci Bob !",
          createdAt: "2024-03-21T11:00:00Z",
          replies: []
        }
      ]
    }
  ]
}

const invalidData = {
  id: "1", // Devrait être un nombre
  author: "Alice",
  content: "Super article !",
  createdAt: "date invalide",
  replies: [
    {
      id: 2,
      author: 123, // Devrait être une chaîne
      content: "Réponse",
      replies: []
    }
  ]
}

export function RecursiveValidation() {
  const [validatedData, setValidatedData] = useState<Comment | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeExample, setActiveExample] = useState<'valid' | 'invalid' | null>(null)

  function validateGoodData() {
    try {
      const validated = commentSchema.parse(sampleData)
      setValidatedData(validated)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join("\n"))
      }
    }
  }

  function validateBadData() {
    try {
      const validated = commentSchema.parse(invalidData)
      setValidatedData(validated)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join("\n"))
      }
    }
  }

  function CommentTree({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
    return (
      <div className={`border-l-2 ${depth === 0 ? 'border-primary' : 'border-gray-200'} pl-4 mt-2`}>
        <div className="font-medium">{comment.author}</div>
        <div className="text-sm">{comment.content}</div>
        <div className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
        {comment.replies.map((reply: Comment) => (
          <CommentTree key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Validation de Structures Imbriquées</CardTitle>
              <CardDescription>
                Découvrez comment Zod valide des données récursives comme des commentaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">👋 Comprendre la validation récursive</h3>
                    <p className="text-sm text-muted-foreground">
                      Cet exemple montre comment Zod peut valider des structures de données imbriquées :
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Les commentaires peuvent contenir des réponses</li>
                      <li>Ces réponses peuvent elles-mêmes avoir des réponses</li>
                      <li>La structure peut s'imbriquer à l'infini !</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">🎮 Essayez par vous-même :</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => {
                          validateGoodData()
                          setActiveExample('valid')
                        }}
                        variant={activeExample === 'valid' ? 'default' : 'outline'}
                        className="flex-1"
                      >
                        1. Données valides
                      </Button>
                      <Button 
                        onClick={() => {
                          validateBadData()
                          setActiveExample('invalid')
                        }}
                        variant={activeExample === 'invalid' ? 'destructive' : 'outline'}
                        className="flex-1"
                      >
                        2. Données invalides
                      </Button>
                    </div>
                  </div>

                  {validatedData && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">✅ Structure validée :</p>
                        <p className="text-xs text-muted-foreground">
                          (Regardez comme les commentaires s'imbriquent !)
                        </p>
                      </div>
                      <Alert>
                        <AlertDescription>
                          <CommentTree comment={validatedData} />
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {error && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">❌ Erreurs de validation :</p>
                        <p className="text-xs text-muted-foreground">
                          (Zod détecte les erreurs à tous les niveaux)
                        </p>
                      </div>
                      <Alert variant="destructive">
                        <AlertDescription>
                          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Structure des données</CardTitle>
              <CardDescription>
                Exemples de structures de commentaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">1️⃣ Structure valide :</p>
                    <p className="text-xs text-muted-foreground">
                      (Tous les champs sont du bon type)
                    </p>
                  </div>
                  <Alert>
                    <AlertDescription>
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(sampleData, null, 2)}
                      </pre>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">2️⃣ Structure invalide :</p>
                    <p className="text-xs text-muted-foreground">
                      (Repérez les erreurs de type)
                    </p>
                  </div>
                  <Alert variant="destructive">
                    <AlertDescription>
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(invalidData, null, 2)}
                      </pre>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Comment ça marche ?</CardTitle>
              <CardDescription>
                Découvrez la magie de la validation récursive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">1️⃣ Le schéma récursif :</p>
                <CodeBlock
                  title="Définition du schéma"
                  code={`// Le schéma se référence lui-même !
const commentSchema = z.lazy(() =>
  z.object({
    id: z.number(),
    author: z.string(),
    content: z.string(),
    createdAt: z.string().datetime(),
    // Les réponses utilisent le même schéma
    replies: z.array(commentSchema).default([]),
  })
)`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2️⃣ Utilisation :</p>
                <CodeBlock
                  title="Validation et typage"
                  code={`// Le type est inféré automatiquement
type Comment = z.infer<typeof commentSchema>

// Validation avec gestion d'erreurs
try {
  const validated = commentSchema.parse(data)
  // validated est de type Comment
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error(err.errors)
  }
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 