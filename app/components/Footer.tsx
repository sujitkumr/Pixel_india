"use client"

import React from "react"

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Pixel Photographers</h2>
        <p className="text-gray-600 mb-4">Capturing memories, one click at a time.</p>

        <div className="flex justify-center space-x-6 mb-4">
          {/* Twitter */}
          <a href="#" className="text-gray-500 hover:text-gray-700 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a8.64 8.64 0 01-2.47.67 4.29 4.29 0 001.88-2.37 8.6 8.6 0 01-2.73 1.04 4.27 4.27 0 00-7.29 3.89A12.1 12.1 0 013 4.77a4.27 4.27 0 001.32 5.7 4.2 4.2 0 01-1.93-.53v.05a4.27 4.27 0 003.43 4.18 4.28 4.28 0 01-1.92.07 4.27 4.27 0 003.98 2.96A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58a8.7 8.7 0 002.15-2.22z" />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" className="text-gray-500 hover:text-gray-700 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.23 0H1.77A1.77 1.77 0 000 1.77v20.46A1.77 1.77 0 001.77 24h11v-9.33H9.5V11.2h3.27V8.39c0-3.24 1.97-5 4.85-5 1.38 0 2.57.1 2.92.15v3.4h-2c-1.57 0-1.87.75-1.87 1.84v2.42h3.74l-.49 3.47h-3.25V24h6.37A1.77 1.77 0 0024 22.23V1.77A1.77 1.77 0 0022.23 0z" />
            </svg>
          </a>

          {/* GitHub */}
          <a href="#" className="text-gray-500 hover:text-gray-700 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.39 2.85 8.11 6.78 9.41.5.09.69-.21.69-.48v-1.67c-2.76.6-3.34-1.32-3.34-1.32-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.82.09-.65.35-1.08.63-1.33-2.2-.25-4.52-1.1-4.52-4.91 0-1.08.39-1.97 1.03-2.67-.1-.26-.45-1.3.1-2.71 0 0 .83-.27 2.73 1.02a9.52 9.52 0 015 0c1.9-1.3 2.73-1.02 2.73-1.02.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.67 0 3.82-2.33 4.66-4.55 4.9.36.31.69.92.69 1.85v2.74c0 .27.18.58.7.48A9.98 9.98 0 0022 12c0-5.51-4.45-9.96-9.96-9.96z" />
            </svg>
          </a>
        </div>

        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Pixel Photographers. All rights reserved.</p>
      </div>
    </footer>
  )
}
