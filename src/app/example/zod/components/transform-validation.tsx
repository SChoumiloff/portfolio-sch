"use client"

import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"

// Schéma pour un produit avec transformations
const productSchema = z.object({
  price: z.string()
    .transform((str) => {
      const cleaned = str.replace(/[^\d.,]/g, "").replace(",", ".")
      const number = parseFloat(cleaned)
      if (isNaN(number)) throw new Error("Prix invalide")
      return number
    })
    .pipe(z.number().positive("Le prix doit être positif")),
  
  tags: z.string()
    .transform(str => str.split(",").map(s => s.trim()).filter(Boolean))
    .pipe(z.array(z.string()).min(1, "Au moins un tag est requis")),
  
  date: z.string()
    .transform(str => new Date(str))
    .pipe(z.date().min(new Date(), "La date doit être dans le futur"))
})

type Product = z.infer<typeof productSchema>

export function TransformValidation() {
  const [formData, setFormData] = useState({
    price: "",
    tags: "",
    date: ""
  })
  const [transformedData, setTransformedData] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeField, setActiveField] = useState<'price' | 'tags' | 'date' | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const validated = productSchema.parse(formData)
      setTransformedData(validated)
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
              <CardTitle>Transformations Magiques avec Zod</CardTitle>
              <CardDescription>
                Découvrez comment Zod peut transformer vos données automatiquement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">👋 Essayez par vous-même !</h3>
                    <p className="text-sm text-muted-foreground">
                      Cet exemple montre comment Zod peut transformer vos données pendant la validation :
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Le prix sera nettoyé et converti en nombre</li>
                      <li>Les tags seront séparés en tableau</li>
                      <li>La date sera convertie en objet Date</li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">1️⃣ Prix</p>
                        {activeField === 'price' && (
                          <p className="text-xs text-muted-foreground">
                            Essayez &ldquo;12,99 €&ldquo; ou &ldquo;15.50$&ldquo;
                          </p>
                        )}
                      </div>
                      <Input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        onFocus={() => setActiveField('price')}
                        placeholder="Ex: 12,99 €"
                        className={activeField === 'price' ? 'ring-2 ring-primary' : ''}
                      />
                      {activeField === 'price' && (
                        <p className="text-xs text-muted-foreground">
                          ℹ️ Zod va nettoyer le prix et le convertir en nombre
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">2️⃣ Tags</p>
                        {activeField === 'tags' && (
                          <p className="text-xs text-muted-foreground">
                            Séparez les tags par des virgules
                          </p>
                        )}
                      </div>
                      <Input
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        onFocus={() => setActiveField('tags')}
                        placeholder="promo, nouveau, tendance"
                        className={activeField === 'tags' ? 'ring-2 ring-primary' : ''}
                      />
                      {activeField === 'tags' && (
                        <p className="text-xs text-muted-foreground">
                          ℹ️ Zod va transformer cette chaîne en tableau de tags
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">3️⃣ Date</p>
                        {activeField === 'date' && (
                          <p className="text-xs text-muted-foreground">
                            Choisissez une date future
                          </p>
                        )}
                      </div>
                      <Input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onFocus={() => setActiveField('date')}
                        className={activeField === 'date' ? 'ring-2 ring-primary' : ''}
                      />
                      {activeField === 'date' && (
                        <p className="text-xs text-muted-foreground">
                          ℹ️ Zod va convertir la chaîne en objet Date
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      ✨ Transformer les données
                    </Button>
                  </form>

                  {transformedData && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">✅ Données transformées :</p>
                        <p className="text-xs text-muted-foreground">
                          (Regardez comme les types ont changé !)
                        </p>
                      </div>
                      <Alert>
                        <AlertDescription>
                          <pre className="text-sm overflow-auto">
                            {JSON.stringify(transformedData, null, 2)}
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
                          (Zod nous explique ce qui ne va pas)
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
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Comment ça marche ?</CardTitle>
              <CardDescription>
                Voici le code qui permet ces transformations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">1️⃣ Le schéma de transformation :</p>
                <CodeBlock
                  title="Schéma avec transformations"
                  code={`const productSchema = z.object({
  // Transforme une chaîne en nombre
  price: z.string()
    .transform((str) => {
      const cleaned = str.replace(/[^\d.,]/g, "")
      const number = parseFloat(cleaned)
      if (isNaN(number)) throw new Error("Prix invalide")
      return number
    })
    .pipe(z.number().positive()),
  
  // Transforme une chaîne en tableau
  tags: z.string()
    .transform(str => str.split(",")
      .map(s => s.trim())
      .filter(Boolean))
    .pipe(z.array(z.string()).min(1)),
  
  // Transforme une chaîne en Date
  date: z.string()
    .transform(str => new Date(str))
    .pipe(z.date().min(new Date()))
})`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2️⃣ Résultat des transformations :</p>
                <CodeBlock
                  title="Avant/Après"
                  code={`// Avant (données brutes)
{
  price: "12,99 €",     // string
  tags: "a, b, c",      // string
  date: "2024-12-31"    // string
}

// Après (données transformées)
{
  price: 12.99,         // number
  tags: ["a", "b", "c"] // string[]
  date: Date            // Date
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