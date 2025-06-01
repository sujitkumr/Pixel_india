"use client"

import { useAppContext } from "../providers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface FilterSidebarProps {
  onClose?: () => void
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const { state, dispatch } = useAppContext()

  const styles = ["Outdoor", "Studio", "Candid", "Traditional", "Indoor"]
  const cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hyderabad"]
  const ratings = [
    { value: 0, label: "All Ratings" },
    { value: 3, label: "3+ Stars" },
    { value: 4, label: "4+ Stars" },
    { value: 4.5, label: "4.5+ Stars" },
  ]

  const handleStyleChange = (style: string, checked: boolean) => {
    const newStyles = checked ? [...state.filters.styles, style] : state.filters.styles.filter((s) => s !== style)

    dispatch({
      type: "UPDATE_FILTERS",
      payload: { styles: newStyles },
    })
  }

  const clearAllFilters = () => {
    dispatch({
      type: "UPDATE_FILTERS",
      payload: {
        priceRange: [0, 20000],
        minRating: 0,
        styles: [],
        city: "",
        searchQuery: "",
      },
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ₹{state.filters.priceRange[0].toLocaleString()} - ₹
            {state.filters.priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={state.filters.priceRange}
            onValueChange={(value) =>
              dispatch({
                type: "UPDATE_FILTERS",
                payload: { priceRange: value as [number, number] },
              })
            }
            max={20000}
            min={0}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <Select
            value={state.filters.minRating.toString()}
            onValueChange={(value) =>
              dispatch({
                type: "UPDATE_FILTERS",
                payload: { minRating: Number.parseFloat(value) },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating.value} value={rating.value.toString()}>
                  {rating.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Photography Styles */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Photography Styles</Label>
          <div className="space-y-2">
            {styles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={style}
                  checked={state.filters.styles.includes(style)}
                  onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                />
                <Label htmlFor={style} className="text-sm">
                  {style}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* City Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">City</Label>
          <Select
            value={state.filters.city}
            onValueChange={(value) =>
              dispatch({
                type: "UPDATE_FILTERS",
                payload: { city: value === "all" ? "" : value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <Select
            value={state.filters.sortBy}
            onValueChange={(value) =>
              dispatch({
                type: "UPDATE_FILTERS",
                payload: { sortBy: value as any },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-high">Rating: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="recently-added">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
