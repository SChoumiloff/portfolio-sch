"use client"

import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string()
  })
})

type User = z.infer<typeof userSchema>

export function ApiValidation() {
  const [validatedData, setValidatedData] = useState<User | null>(null)
  const [unvalidatedData, setUnvalidatedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeExample, setActiveExample] = useState<'validated' | 'raw' | null>(null)

  async function fetchWithValidation() {
    setIsLoading(true)
    setActiveExample('validated')
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const data = await response.json()
      
      const validatedUser = userSchema.parse(data)
      setValidatedData(validatedUser)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(`Erreur de validation: ${err.errors.map(e => e.message).join(", ")}`)
      } else {
        setError("Erreur lors de la récupération des données")
      }
      setValidatedData(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchWithoutValidation() {
    setIsLoading(true)
    setActiveExample('raw')
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const data = await response.json()
      setUnvalidatedData(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors de la récupération des données")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Sécurisation des Données d&apos;API</CardTitle>
              <CardDescription>
                Découvrez pourquoi et comment valider les données d&apos;API avec Zod
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">👋 Pourquoi valider les données d&apos;API ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Les APIs peuvent parfois renvoyer des données inattendues :
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Champs manquants ou mal formatés</li>
                      <li>Types de données incorrects</li>
                      <li>Structure de réponse modifiée</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">🎮 Comparez les deux approches :</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={fetchWithValidation}
                          disabled={isLoading}
                          variant={activeExample === 'validated' ? 'default' : 'outline'}
                          className="w-full"
                        >
                          1. Avec Zod
                        </Button>
                        <Button 
                          onClick={fetchWithoutValidation}
                          disabled={isLoading}
                          variant={activeExample === 'raw' ? 'default' : 'outline'}
                          className="w-full"
                        >
                          2. Sans Zod
                        </Button>
                      </div>
                    </div>

                    {isLoading && (
                      <Alert>
                        <AlertDescription>
                          Chargement des données...
                        </AlertDescription>
                      </Alert>
                    )}

                    {validatedData && activeExample === 'validated' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">✅ Données validées :</p>
                          <p className="text-xs text-muted-foreground">
                            (Types garantis par Zod)
                          </p>
                        </div>
                        <Alert>
                          <AlertDescription>
                            <pre className="text-sm overflow-auto">
                              {JSON.stringify(validatedData, null, 2)}
                            </pre>
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {unvalidatedData && activeExample === 'raw' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">⚠️ Données brutes :</p>
                          <p className="text-xs text-muted-foreground">
                            (Aucune garantie sur les types)
                          </p>
                        </div>
                        <Alert variant="destructive">
                          <AlertDescription>
                            <pre className="text-sm overflow-auto">
                              {JSON.stringify(unvalidatedData, null, 2)}
                            </pre>
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {error && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">❌ Erreur :</p>
                          <p className="text-xs text-muted-foreground">
                            (Zod nous protège des données invalides)
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Comment ça marche ?</CardTitle>
              <CardDescription>
                Voici comment implémenter la validation d&apos;API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">1️⃣ Définissez votre schéma :</p>
                <CodeBlock
                  title="Schéma de validation"
                  code={`const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string()
  })
})

// Le type est inféré automatiquement
type User = z.infer<typeof userSchema>`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2️⃣ Utilisez-le avec fetch :</p>
                <CodeBlock
                  title="Validation des données d'API"
                  code={`async function fetchUser() {
  try {
    const response = await fetch("/api/user")
    const data = await response.json()
    
    // Validation et typage automatique
    const validatedUser = userSchema.parse(data)
    return validatedUser // Typé comme User
    
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Gestion des erreurs de validation
      console.error(err.errors)
    }
    throw err
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