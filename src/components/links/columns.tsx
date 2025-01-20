import { ColumnDef } from "@tanstack/react-table"
import { Link, View } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"

export type LinkWithViews = Link & {
  views: View[]
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
    cell: ({ row }) => {
      const link = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(link.link)}
            >
              Copier le lien
            </DropdownMenuItem>
            <DropdownMenuItem>Voir les statistiques</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 