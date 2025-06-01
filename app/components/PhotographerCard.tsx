"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"
import type { Photographer } from "../providers"

interface PhotographerCardProps {
  photographer: Photographer
  viewMode: "grid" | "list"
}

export function PhotographerCard({ photographer, viewMode }: PhotographerCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={photographer.profilePic || "/placeholder.svg"}
                alt={photographer.name}
                width={200}
                height={200}
                className="w-full md:w-32 h-48 md:h-32 rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{photographer.name}</h3>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{photographer.rating}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{photographer.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{photographer.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {photographer.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {photographer.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{photographer.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{photographer.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Starting price</div>
                  </div>

                  <Link href={`/photographer/${photographer.id}`}>
                    <Button>View Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={photographer.profilePic || "/placeholder.svg"}
            alt={photographer.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-gray-900 shadow-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {photographer.rating}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{photographer.name}</h3>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{photographer.location}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {photographer.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {photographer.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{photographer.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-gray-900">₹{photographer.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Starting price</div>
            </div>

            <Link href={`/photographer/${photographer.id}`}>
              <Button size="sm">View Profile</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
