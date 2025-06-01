"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface Photographer {
  id: number
  name: string
  location: string
  price: number
  rating: number
  styles: string[]
  tags: string[]
  bio: string
  profilePic: string
  portfolio: string[]
  reviews: Review[]
}

interface Review {
  name: string
  rating: number
  comment: string
  date: string
}

interface Filters {
  priceRange: [number, number]
  minRating: number
  styles: string[]
  city: string
  sortBy: "price-low" | "price-high" | "rating-high" | "recently-added"
  searchQuery: string
}

interface AppState {
  photographers: Photographer[]
  filteredPhotographers: Photographer[]
  filters: Filters
  loading: boolean
  currentPage: number
  itemsPerPage: number
}

type AppAction =
  | { type: "SET_PHOTOGRAPHERS"; payload: Photographer[] }
  | { type: "SET_FILTERED_PHOTOGRAPHERS"; payload: Photographer[] }
  | { type: "UPDATE_FILTERS"; payload: Partial<Filters> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CURRENT_PAGE"; payload: number }

const initialState: AppState = {
  photographers: [],
  filteredPhotographers: [],
  filters: {
    priceRange: [0, 20000],
    minRating: 0,
    styles: [],
    city: "",
    sortBy: "rating-high",
    searchQuery: "",
  },
  loading: false,
  currentPage: 1,
  itemsPerPage: 6,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PHOTOGRAPHERS":
      return { ...state, photographers: action.payload }
    case "SET_FILTERED_PHOTOGRAPHERS":
      return { ...state, filteredPhotographers: action.payload }
    case "UPDATE_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function Providers({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within Providers")
  }
  return context
}

export type { Photographer, Review, Filters }
