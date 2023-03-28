import Head from 'next/head'
import { Navbar } from '../components'
import React, { useEffect, useState } from 'react'
import { Calendar, Star1 } from 'iconsax-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import 'swiper/css'

const tvshowsVariants = {
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

const tvshows = ({ tvshows }) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
  const posterImgBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  const [currentIndex, setCurrentIndex] = useState(0)
  const backgroundImg = imageBaseUrl + tvshows[currentIndex].backdrop_path

  const handleClick = (index) => {
    setCurrentIndex(index)
  }
  useEffect(() => {
    console.log(tvshows)
  }, [tvshows])

  return (
    <div
      className="h-screen py app md:px-32 px-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backgroundImg})`,
      }}
    >
      <Head>
        <title>Next TV</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <motion.main
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={tvshowsVariants}
        className="w-full text-white font-oswald"
      >
        <div className="md:pr-96 md:mt-8 mt-5 space-y-5">
          <motion.h3
            variants={headingVariants}
            className="font-bold md:text-4xl uppercase"
          >
            {tvshows[currentIndex].original_name}
          </motion.h3>
          <motion.p
            variants={overviewVariants}
            className="text-lg font-light md:w-full"
          >
            {tvshows[currentIndex].overview}
          </motion.p>
          <motion.div
            variants={dateVariants}
            className="flex items-center space-x-10"
          >
            <p className="flex items-center space-x-5">
              <Calendar size={32} color="#fff" variant="Bulk" />
              <span>{tvshows[currentIndex].first_air_date}</span>
            </p>
            <p className="flex items-center space-x-5">
              <Star1 size="32" color="#fff" variant="Bulk" />
              <span>{tvshows[currentIndex].vote_average}/10</span>
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
            {tvshows.map((tvshow, index) => (
              <SwiperSlide>
                <div key={tvshow.id} onClick={() => handleClick(index)}>
                  <img
                    src={posterImgBaseUrl + tvshow.poster_path}
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
    </div>
  )
}
export default tvshows

export async function getStaticProps() {
  const apiKey = process.env.NEXT_TMDB_API
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
  )
  const data = await response.json()
  const tvshows = data.results

  return {
    props: {
      tvshows,
    },
  }
}
