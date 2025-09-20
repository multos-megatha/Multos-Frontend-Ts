'use client'

import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col items-center space-y-6">
        {/* GIF Error */}
        <Image
          src="/multoseror.gif"
          alt="Error"
          width={180}
          height={180}
          className="w-28 h-28 sm:w-40 sm:h-40"
        />

        {/* Title & Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Oops! The page you are looking for doesn’t exist.
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="mt-2 inline-block px-6 py-3 rounded-lg bg-red-600 text-white font-medium text-sm sm:text-base shadow-md hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
