import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navbarVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: 'spring',
      stiffness: 120,
    },
  },
  exit: {
    y: '-100vh',
    transition: {
      ease: 'easeInOut',
    },
  },
}
const logoVariants = {
  hidden: {
    opacity: 0,
    rotate: -360,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      delay: 0.9,
      duration: 1.2,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
}

const Navbar = () => {
  return (
    <motion.nav
      animate="visible"
      initial="hidden"
      variants={navbarVariants}
      className="flex justify-between items-center w-full text-white font-semibold py-3 text-xl"
    >
      <Link href="/">Movies</Link>
      <motion.img
        variants={logoVariants}
        src="/movieLogo.png"
        alt=""
        className="w-10"
      />
      <Link href="/tvshows">TvShows</Link>
    </motion.nav>
  )
}

export default Navbar
