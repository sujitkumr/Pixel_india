"use client"

import { useState } from "react"
import { useAppContext } from "../providers"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function SearchBar() {
  const { state, dispatch } = useAppContext()
  const [localSearch, setLocalSearch] = useState(state.filters.searchQuery)

  const handleSearch = (value: string) => {
    setLocalSearch(value)
    dispatch({
      type: "UPDATE_FILTERS",
      payload: { searchQuery: value },
    })
  }

  const clearSearch = () => {
    setLocalSearch("")
    dispatch({
      type: "UPDATE_FILTERS",
      payload: { searchQuery: "" },
    })
  }

  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by name, location, or specialty..."
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {localSearch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
