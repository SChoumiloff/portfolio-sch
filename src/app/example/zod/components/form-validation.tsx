"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { useState } from "react"

const formSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})

type FormData = z.infer<typeof formSchema>

export function FormValidation() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [unsafeSubmission, setUnsafeSubmission] = useState<any>(null)
  const [activeExample, setActiveExample] = useState<'safe' | 'unsafe' | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  function onSubmit(values: FormData) {
    setSubmittedData(values)
    setActiveExample('safe')
  }

  function onUnsafeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get("unsafe-email"),
      password: formData.get("unsafe-password")
    }
    setUnsafeSubmission(data)
    setActiveExample('unsafe')
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle>Validation de Formulaire avec Zod</CardTitle>
              <CardDescription>
                Découvrez comment sécuriser vos formulaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md w-full space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">👋 Pourquoi valider les formulaires ?</h3>
                    <p className="text-sm text-muted-foreground">
                      La validation côté client est essentielle pour :
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Améliorer l&apos;expérience utilisateur</li>
                      <li>Réduire les erreurs de saisie</li>
                      <li>Protéger votre application</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">🎮 Comparez les deux approches :</p>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                          <p className="text-sm font-medium">1️⃣ Avec Zod et React Hook Form :</p>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="email@exemple.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirmer le mot de passe</FormLabel>
                                    <FormControl>
                                      <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button 
                                type="submit"
                                variant={activeExample === 'safe' ? 'default' : 'outline'}
                              >
                                Soumettre (sécurisé)
                              </Button>
                            </form>
                          </Form>
                        </div>

                        <div className="space-y-4">
                          <p className="text-sm font-medium">2️⃣ Sans validation :</p>
                          <form onSubmit={onUnsafeSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Email</label>
                              <Input name="unsafe-email" type="text" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Mot de passe</label>
                              <Input name="unsafe-password" type="password" />
                            </div>
                            <Button 
                              type="submit"
                              variant={activeExample === 'unsafe' ? 'destructive' : 'outline'}
                            >
                              Soumettre (non sécurisé)
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>

                    {(submittedData || unsafeSubmission) && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">📊 Résultats :</p>
                        <div className="grid grid-cols-1 gap-4">
                          {submittedData && (
                            <Alert>
                              <AlertDescription>
                                <h4 className="font-medium mb-2">✅ Données validées</h4>
                                <pre className="text-sm">
                                  {JSON.stringify(submittedData, null, 2)}
                                </pre>
                              </AlertDescription>
                            </Alert>
                          )}
                          {unsafeSubmission && (
                            <Alert variant="destructive">
                              <AlertDescription>
                                <h4 className="font-medium mb-2">⚠️ Données non validées</h4>
                                <pre className="text-sm">
                                  {JSON.stringify(unsafeSubmission, null, 2)}
                                </pre>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
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
              <CardTitle>Le code</CardTitle>
              <CardDescription>
                Implémentation de la validation avec Zod
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                title="Schema de validation"
                code={`const formSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})`}
              />

              <CodeBlock
                title="Utilisation avec React Hook Form"
                code={`const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: "",
    confirmPassword: ""
  },
})`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 