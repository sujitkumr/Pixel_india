import { NextResponse } from "next/server"

const photographers = [
  {
    id: 1,
    name: "Ravi Studio",
    location: "Bengaluru",
    price: 10000,
    rating: 4.6,
    styles: ["Outdoor", "Studio"],
    tags: ["Candid", "Maternity"],
    bio: "Award-winning studio specializing in maternity and newborn shoots.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Ananya",
        rating: 5,
        comment: "Truly amazing photos and experience!",
        date: "2024-12-15",
      },
    ],
  },
  {
    id: 2,
    name: "Lens Queen Photography",
    location: "Delhi",
    price: 15000,
    rating: 4.2,
    styles: ["Candid", "Indoor"],
    tags: ["Newborn", "Birthday"],
    bio: "Delhi-based candid specialist for kids and birthday parties.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Priya",
        rating: 4,
        comment: "Very professional and punctual!",
        date: "2024-10-01",
      },
    ],
  },
  {
    id: 3,
    name: "Click Factory",
    location: "Mumbai",
    price: 8000,
    rating: 4.8,
    styles: ["Studio", "Outdoor", "Traditional"],
    tags: ["Wedding", "Pre-wedding"],
    bio: "Capturing timeless wedding stories across India.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Rahul",
        rating: 5,
        comment: "We loved every single moment they captured.",
        date: "2025-01-22",
      },
    ],
  },
  {
    id: 4,
    name: "Moments by Neha",
    location: "Bengaluru",
    price: 12000,
    rating: 4.3,
    styles: ["Outdoor", "Candid"],
    tags: ["Maternity", "Couple"],
    bio: "Natural light specialist focusing on emotional storytelling.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Sneha",
        rating: 4.5,
        comment: "Captured our maternity journey so beautifully.",
        date: "2024-11-05",
      },
    ],
  },
  {
    id: 5,
    name: "Snapshot Studio",
    location: "Hyderabad",
    price: 7000,
    rating: 3.9,
    styles: ["Studio"],
    tags: ["Birthday", "Family"],
    bio: "Affordable indoor shoots with creative themes.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Vikram",
        rating: 3.5,
        comment: "Decent service, could improve on punctuality.",
        date: "2024-09-10",
      },
    ],
  },
  {
    id: 6,
    name: "Creative Lens",
    location: "Chennai",
    price: 11000,
    rating: 4.7,
    styles: ["Candid", "Traditional"],
    tags: ["Wedding", "Engagement"],
    bio: "Traditional and candid wedding photography with modern touch.",
    profilePic: "/placeholder.svg?height=300&width=300",
    portfolio: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        name: "Meera",
        rating: 5,
        comment: "Perfect wedding photography!",
        date: "2024-08-20",
      },
    ],
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json({ photographers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch photographers" }, { status: 500 })
  }
}
