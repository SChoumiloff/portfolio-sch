import { ColumnDef, TableMeta } from "@tanstack/react-table"
import { Link, View } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Copy, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { deleteLink } from "@/app/admin/actions"
import { useState } from "react"

import { formatDate } from "@/lib/utils"
import { EditLinkDialog } from "../edit-link-dialog"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    refreshData: () => void
  }
}

export type LinkWithViews = Link & {
  views: View[]
}

const ActionsCell = ({ row, table }: { row: any, table: any }) => {
  const link = row.original
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const result = await deleteLink(link.id)
      if (!result.success) {
        throw new Error(result.error)
      }
      toast.success("Lien supprimé avec succès")
      table.options.meta?.refreshData()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(link.link)
    toast.success("Lien copié dans le presse-papier")
  }

  return (
    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation()
            handleCopy()
          }}>
            <Copy className="mr-2 h-4 w-4" />
            Copier le lien
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation()
            setIsEditOpen(true)
          }}>
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem 
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le lien et toutes ses statistiques seront définitivement supprimés.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLinkDialog 
        link={link} 
        open={isEditOpen} 
        onOpenChange={(open) => {
          setIsEditOpen(open)
        }}
        onSuccess={() => {
          table.options.meta?.refreshData()
          toast.success("Lien modifié avec succès")
        }}
      />
    </div>
  )
}

export const columns: ColumnDef<LinkWithViews>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "link",
    header: "Lien",
    cell: ({ row }) => {
      const link = row.original.link
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {link}
        </a>
      )
    }
  },
  {
    accessorKey: "views",
    header: "Nombre de vues",
    cell: ({ row }) => {
      const viewCount = row.original.views.length;
      return viewCount;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => formatDate(row.original.createdAt.toISOString()),
  },
  {
    id: "actions",
    cell: ({ row, table }) => <ActionsCell row={row} table={table} />
  },
] 