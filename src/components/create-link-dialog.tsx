"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLink } from "@/app/admin/actions";
import { fetchContentLinks } from "@/app/actions";

interface Route {
  value: string;
  label: string;
}

function generateShortLink() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: generateShortLink(),
    targetRoute: "",
  });
  const [blogRoutes, setBlogRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const loadContentLinks = async () => {
      const links = await fetchContentLinks();
      setBlogRoutes(links);
    };
    loadContentLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const finalTargetRoute = `${process.env.NEXT_PUBLIC_URL}${formData.targetRoute}?id=${formData.link}`;
      
      const result = await createLink({
        name: formData.name,
        description: formData.description,
        link: finalTargetRoute,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Lien créé avec succès!");
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        link: generateShortLink(),
        targetRoute: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création du lien");
    } finally {
      setIsLoading(false);
    }
  };

  const AVAILABLE_ROUTES = [
    { 
      category: "Pages principales",
      routes: [
        { value: "/", label: "Page d'accueil" },
        { value: "/blog", label: "Blog" },
      ]
    },
    {
      category: "Articles de blog",
      routes: blogRoutes
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouveau lien
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Créer un nouveau lien court</DialogTitle>
            <DialogDescription>
              Créez un lien court pour rediriger vers une page de votre application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                placeholder="Nom du lien"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetRoute">Page cible</Label>
              <Select
                value={formData.targetRoute}
                onValueChange={(value) => {
                  setFormData({ 
                    ...formData, 
                    targetRoute: value,
                    name: AVAILABLE_ROUTES
                      .flatMap(category => category.routes)
                      .find(route => route.value === value)?.label || ""
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une page" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ROUTES.map((category) => (
                    <div key={category.category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {category.category}
                      </div>
                      {category.routes.map((route) => (
                        <SelectItem key={route.value} value={route.value}>
                          {route.label}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Lien court</Label>
              <div className="flex gap-2">
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="col-span-3"
                  maxLength={5}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({ ...formData, link: generateShortLink() })
                  }
                >
                  Générer
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description du lien"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer le lien"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}