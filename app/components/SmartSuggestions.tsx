"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function SmartSuggestions() {
  const suggestions = [
    "Top-rated outdoor maternity photographers in Bengaluru",
    "Affordable wedding photographers under ₹10,000",
    "Candid photography specialists near you",
  ]

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-blue-900">AI Smart Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-100 transition-colors">
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  )
}
