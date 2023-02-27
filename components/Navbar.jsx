import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full text-white font-semibold py-4 text-xl">
      <Link href="/">Movies</Link>
      <img src="/movieLogo.png" alt="" className="w-10" />
      <Link href="/tvshows">TvShows</Link>
    </nav>
  )
}

export default Navbar
