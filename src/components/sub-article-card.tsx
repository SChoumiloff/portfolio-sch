import { ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"

export interface SubArticleCardProps {
    title: string
    description: string
    tags: string[]
    readingTime: string
    image: string
    slug: string
}

export function SubArticleCard({ title, description, tags, readingTime, image, slug }: SubArticleCardProps) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} logo`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="mb-2 text-2xl font-bold">{title}</h3>
          <p className="mb-4 text-sm h-[105px]">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            {readingTime}
          </div>
          <Link 
            href={`/blog/${slug}`}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Lire
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    )
  }