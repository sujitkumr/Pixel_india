# Pixisphere Frontend Assignment

A React + Next.js project for **Pixisphere**, a platform connecting customers with the best photographers and studios for maternity, newborn, birthday, and other special shoots.

---

## Demo

Live demo URL:  
([Site](https://pixel-india-git-main-sujitkumrs-projects.vercel.app))

---

## Project Overview

This project includes two core pages:

1. **Category Listing Page**  
   Displays photographers based on selected category and location with advanced filters, sorting, search, and pagination/load more functionality.

2. **Photographer Profile Page**  
   Shows detailed profile of a selected photographer including bio, styles, price, portfolio gallery, reviews, and inquiry modal.

---

## Features

- Photographer cards with name, picture, location, price, rating, tags, and a "View Profile" button.
- Filters: price range slider, ratings filter, styles checkboxes, city dropdown.
- Sorting options: price (low to high), rating (high to low), recently added.
- Search bar with debounced, fuzzy search on name, location, and tags.
- Load more button for pagination.
- Responsive and mobile-first UI using Tailwind CSS.
- State management with React Context API.
- Skeleton loaders during data fetching.
- Mock API server using JSON Server for local development.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pixisphere-frontend.git
cd pixisphere-frontend

npm install
# or
yarn install
Open http://localhost:3000 in your browser to view the app.
