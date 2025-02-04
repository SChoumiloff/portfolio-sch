"use client"

import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"

// Définition du schéma de réponse API
const ApiResponse = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.object({
      user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
      })
    }),
  }),
  z.object({
    status: z.literal("error"),
    error: z.object({
      code: z.string(),
      message: z.string(),
    }),
  }),
])

type ApiResponseType = z.infer<typeof ApiResponse>

// Données d'exemple
const successData = {
  status: "success",
  data: {
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com"
    }
  }
}

const errorData = {
  status: "error",
  error: {
    code: "USER_NOT_FOUND",
    message: "L'utilisateur n'existe pas"
  }
}

const invalidData = {
  status: "success",
  data: {
    user: {
      id: "1", // Devrait être un nombre
      name: 123, // Devrait être une string
      email: "invalid-email" // Email invalide
    }
  }
}

export function DiscriminatedValidation() {
  const [validatedData, setValidatedData] = useState<ApiResponseType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<'success' | 'error' | 'invalid' | null>(null)

  function validateSuccess() {
    try {
      const validated = ApiResponse.parse(successData)
      setValidatedData(validated)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join("\n"))
      }
    }
  }

  function validateError() {
    try {
      const validated = ApiResponse.parse(errorData)
      setValidatedData(validated)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join("\n"))
      }
    }
  }

  function validateInvalid() {
    try {
      const validated = ApiResponse.parse(invalidData)
      setValidatedData(validated)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join("\n"))
      }
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Validation de Réponses API</CardTitle>
              <CardDescription>
                Découvrez comment Zod gère différents formats de réponse API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">👋 Commencez ici !</h3>
                    <p className="text-sm text-muted-foreground">
                      Cliquez sur les boutons ci-dessous pour voir comment Zod valide différents types de réponses API :
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Le bouton "Succès" montre une réponse API valide</li>
                      <li>Le bouton "Erreur" montre une réponse d'erreur valide</li>
                      <li>Le bouton "Invalide" montre ce qui se passe quand les données sont incorrectes</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => {
                        validateSuccess()
                        setActiveStep('success')
                      }}
                      className="flex-1"
                      variant={activeStep === 'success' ? 'default' : 'outline'}
                    >
                      1. Succès
                    </Button>
                    <Button 
                      onClick={() => {
                        validateError()
                        setActiveStep('error')
                      }}
                      className="flex-1"
                      variant={activeStep === 'error' ? 'default' : 'outline'}
                    >
                      2. Erreur
                    </Button>
                    <Button 
                      onClick={() => {
                        validateInvalid()
                        setActiveStep('invalid')
                      }}
                      className="flex-1"
                      variant={activeStep === 'invalid' ? 'destructive' : 'outline'}
                    >
                      3. Invalide
                    </Button>
                  </div>
                </div>

                {validatedData && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">✅ Données validées avec succès :</p>
                      {activeStep === 'success' && (
                        <p className="text-xs text-muted-foreground">
                          (Notez que les données sont correctement typées)
                        </p>
                      )}
                      {activeStep === 'error' && (
                        <p className="text-xs text-muted-foreground">
                          (Une erreur peut aussi être un format valide !)
                        </p>
                      )}
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

                {error && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">❌ Erreurs de validation :</p>
                      <p className="text-xs text-muted-foreground">
                        (Zod nous dit exactement ce qui ne va pas)
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
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Données d'exemple</CardTitle>
              <CardDescription>
                Différents formats de réponse API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Réponse succès :</p>
                  <Alert>
                    <AlertDescription>
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(successData, null, 2)}
                      </pre>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Réponse erreur :</p>
                  <Alert>
                    <AlertDescription>
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(errorData, null, 2)}
                      </pre>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Données invalides :</p>
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
                Voici le code qui permet cette validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">1️⃣ D'abord, on définit notre schéma :</p>
                <CodeBlock
                  title="Schéma d'union discriminée"
                  code={`const ApiResponse = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.object({
      user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
      })
    }),
  }),
  z.object({
    status: z.literal("error"),
    error: z.object({
      code: z.string(),
      message: z.string(),
    }),
  }),
])`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2️⃣ Ensuite, on l'utilise comme ça :</p>
                <CodeBlock
                  title="Validation avec gestion des cas"
                  code={`const result = ApiResponse.parse(response)

if (result.status === "success") {
  // TypeScript sait que result.data existe
  console.log(result.data.user.name)
} else {
  // TypeScript sait que result.error existe
  console.error(result.error.message)
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