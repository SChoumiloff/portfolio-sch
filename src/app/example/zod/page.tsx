"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormValidation } from "./components/form-validation"
import { ApiValidation } from "./components/api-validation"
import { RecursiveValidation } from "./components/recursive-validation"
import { TransformValidation } from "./components/transform-validation"
import Link from "next/link"
import { DiscriminatedValidation } from "./components/discriminated-validation"

export default function ZodExamplesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "form"

  useEffect(() => {
    // Mettre à jour l'URL si le tab par défaut est sélectionné
    if (!searchParams.get("tab")) {
      router.replace("/example/zod?tab=form")
    }
  }, [searchParams, router])

  const handleTabChange = (value: string) => {
    router.push(`/example/zod?tab=${value}`)
  }

  return (
    <div className="container py-6">
      <div className="max-w-3xl  mb-10 space-y-4">
        <h1 className="text-3xl font-bold">Exemples pratiques de Zod</h1>
        <p className="text-muted-foreground">
          Ces exemples interactifs accompagnent l'article{" "}
          <Link 
            href="/blog/next-zod" 
            target="_blank"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            "Zod : Validez vos données avec élégance et simplicité"
          </Link>
          . Ils vous permettent d'expérimenter en direct avec les différentes fonctionnalités de Zod présentées dans l'article.
        </p>
      </div>

      <div className="mb-6 w-full md:w-1/4">
        <Select value={tab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un exemple" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="form">Validation de Formulaire</SelectItem>
            <SelectItem value="api">Validation d'API</SelectItem>
            <SelectItem value="recursive">Structures Récursives</SelectItem>
            <SelectItem value="transform">Transformations</SelectItem>
            <SelectItem value="discriminated">Validation Discriminée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        {tab === "form" && <FormValidation />}
        {tab === "api" && <ApiValidation />}
        {tab === "recursive" && <RecursiveValidation />}
        {tab === "transform" && <TransformValidation />}
        {tab === "discriminated" && <DiscriminatedValidation />}
      </div>
    </div>
  )
} 