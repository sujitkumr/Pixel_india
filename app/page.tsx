"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppContext } from "./providers";
import { SearchBar } from "./components/SearchBar";
import { FilterSidebar } from "./components/FilterSidebar";
import { PhotographerCard } from "./components/PhotographerCard";
import { LoadingGrid } from "./components/LoadingGrid";
import { SmartSuggestions } from "./components/SmartSuggestions";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { Footer } from "./components/Footer";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Home() {
  const { state, dispatch } = useAppContext();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayedItems, setDisplayedItems] = useState(6);

  const debouncedSearchQuery = useDebounce(state.filters.searchQuery, 300);

  // Fetch photographers on mount
  useEffect(() => {
    const fetchPhotographers = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await fetch("/api/photographers");
        const data = await response.json();
        dispatch({ type: "SET_PHOTOGRAPHERS", payload: data.photographers });
      } catch (error) {
        console.error("Failed to fetch photographers:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchPhotographers();
  }, [dispatch]);

  // Filter and sort photographers
  const filteredAndSortedPhotographers = useMemo(() => {
    const filtered = state.photographers.filter((photographer) => {
      // Price range filter
      if (
        photographer.price < state.filters.priceRange[0] ||
        photographer.price > state.filters.priceRange[1]
      ) {
        return false;
      }

      // Rating filter
      if (photographer.rating < state.filters.minRating) {
        return false;
      }

      // Styles filter
      if (
        state.filters.styles.length > 0 &&
        !state.filters.styles.some((style) =>
          photographer.styles.includes(style)
        )
      ) {
        return false;
      }

      // City filter
      if (state.filters.city && photographer.location !== state.filters.city) {
        return false;
      }

      // Search query filter
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase();
        const searchableText = [
          photographer.name,
          photographer.location,
          ...photographer.tags,
          ...photographer.styles,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort photographers
    switch (state.filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-high":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "recently-added":
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [state.photographers, state.filters, debouncedSearchQuery]);

  // Update filtered photographers when filters change
  useEffect(() => {
    dispatch({
      type: "SET_FILTERED_PHOTOGRAPHERS",
      payload: filteredAndSortedPhotographers,
    });
  }, [filteredAndSortedPhotographers, dispatch]);

  const loadMore = useCallback(() => {
    setDisplayedItems((prev) => prev + 6);
  }, []);

  const displayedPhotographers = filteredAndSortedPhotographers.slice(
    0,
    displayedItems
  );
  const hasMore = displayedItems < filteredAndSortedPhotographers.length;

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <LoadingGrid />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 sm:px-8 lg:px-12">
    {/* // <div className="min-h-screen bg-gray-50"> */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-3xl p-6 sm:p-10 mb-10 border justify-center text-center border-gray-200 shadow-sm">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
            Pixel Photographers in India
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl text-center mx-auto">
            Find the perfect photographer for your special moments.
          </p>
        </div>

      
        <SmartSuggestions />

    
        <SearchBar />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-gray-600">
              {filteredAndSortedPhotographers.length} photographers found
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 flex-shrink-0`}
          >
            <FilterSidebar onClose={() => setShowFilters(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {filteredAndSortedPhotographers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No photographers found matching your criteria.
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {displayedPhotographers.map((photographer) => (
                    <PhotographerCard
                      key={photographer.id}
                      photographer={photographer}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button onClick={loadMore} size="lg">
                      Load More Photographers
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
