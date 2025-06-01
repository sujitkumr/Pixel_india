"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { InquiryModal } from "@/app/components/InquiryModal"
import { ImageGallery } from "@/app/components/ImageGallery"
import { ReviewCard } from "@/app/components/ReviewCard"
import { ArrowLeft, Star, MapPin, Camera, Tag } from "lucide-react"
import type { Photographer } from "@/app/providers"

export default function PhotographerProfile() {
  const params = useParams()
  const router = useRouter()
  const [photographer, setPhotographer] = useState<Photographer | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await fetch(`/api/photographers/${params.id}`)
        const data = await response.json()

        if (response.ok) {
          setPhotographer(data.photographer)
        } else {
          console.error("Photographer not found")
        }
      } catch (error) {
        console.error("Failed to fetch photographer:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPhotographer()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div>
                <div className="h-80 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Photographer Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={photographer.profilePic || "/placeholder.svg"}
                    alt={photographer.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{photographer.name}</h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{photographer.rating}</span>
                      <span className="text-gray-500">({photographer.reviews.length} reviews)</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{photographer.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Styles:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photographer.styles.map((style) => (
                        <Badge key={style} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Specialties:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photographer.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{photographer.bio}</p>
                </div>
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio</h2>
              <ImageGallery images={photographer.portfolio} />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews ({photographer.reviews.length})</h2>
              <div className="space-y-4">
                {photographer.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹{photographer.price.toLocaleString()}</div>
                  <div className="text-gray-600">Starting price</div>
                </div>

                <Button className="w-full mb-4" size="lg" onClick={() => setShowInquiryModal(true)}>
                  Send Inquiry
                </Button>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Response time:</span>
                    <span className="font-medium">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking advance:</span>
                    <span className="font-medium">2-4 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery time:</span>
                    <span className="font-medium">1-2 weeks</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pre-shoot consultation</li>
                    <li>• 2-3 hours photo session</li>
                    <li>• Professional editing</li>
                    <li>• 50+ high-resolution images</li>
                    <li>• Online gallery access</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        photographerName={photographer.name}
      />
    </div>
  )
}
