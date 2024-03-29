import Head from 'next/head'
import { Navbar } from '../components'
import React, { useEffect, useState } from 'react'
import { Calendar, Star1 } from 'iconsax-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import 'swiper/css'

const homeVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.5,
      duration: 1,
      type: 'spring',
      stiffness: 200,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
}

const headingVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5,
      duration: 1,
      type: 'spring',
      stiffness: 200,
    },
  },
}
const overviewVariants = {
  hidden: {
    opacity: 0,
    y: '100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.6,
      duration: 1,
      type: 'spring',
      stiffness: 170,
    },
  },
}
const dateVariants = {
  hidden: {
    opacity: 0,
    x: '100vh',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.7,
      duration: 1,
      type: 'spring',
      stiffness: 150,
    },
  },
}

const Home = ({ movies }) => {
  const imageBaseURL = 'https://image.tmdb.org/t/p/original'
  const posterImgBaseURL = 'https://image.tmdb.org/t/p/w500/'
  const [currentIndex, setCurrentIndex] = useState(0)
  const backgroundImg = imageBaseURL + movies[currentIndex].backdrop_path

  const handleClick = (index) => {
    setCurrentIndex(index)
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-screen py-2 app md:px-32 px-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backgroundImg})`,
      }}
    >
      <Head>
        <title>Next Movie</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <motion.main
        variants={homeVariants}
        className="w-full text-white font-oswald"
      >
        <div className="md:pr-96 md:mt-8 mt-5 space-y-5">
          <motion.h3
            variants={headingVariants}
            className="font-bold md:text-4xl text-2xl uppercase"
          >
            {movies[currentIndex].title}
          </motion.h3>
          <p
            variants={overviewVariants}
            className="text-lg font-light md:w-4/5"
          >
            {movies[currentIndex].overview}
          </p>
          <motion.div
            variants={dateVariants}
            className="flex items-center space-x-10"
          >
            <p className="flex items-center space-x-5">
              <Calendar size={32} color="#fff" variant="Bulk" />
              <span>{movies[currentIndex].release_date}</span>
            </p>
            <p className="flex items-center space-x-5">
              <Star1 size={32} color="#fff" variant="Bulk" />
              <span>{movies[currentIndex].vote_average}/10</span>
            </p>
          </motion.div>
        </div>
        <div className="bg-white bg-opacity-20 p-3 mt-8">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {movies.map((movie, index) => (
              <SwiperSlide>
                <div key={movie.id} onClick={() => handleClick(index)}>
                  <img
                    src={posterImgBaseURL + movie.poster_path}
                    loading="lazy"
                    alt=""
                    className="rounded-md cursor-pointer transition duration-300 hover:border-2 hover:-translate-y-2"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.main>
    </motion.div>
  )
}

export default Home

export async function getStaticProps() {
  const apiKey = process.env.NEXT_TMDB_API
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  )
  const data = await response.json()
  const movies = data.results

  return {
    props: {
      movies,
    },
  }
}
