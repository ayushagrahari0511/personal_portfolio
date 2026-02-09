import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import Achievements from '../components/Achievements'
import Project2 from '../components/Project2'
import { useState } from 'react'
import Connect from '../components/Connect'
import CustomCursor from '../components/CustomCursor'
import ScrollMarqueeBanner from '../components/ScrollMarqueeBanner'

export default function Home() {

  const [open, setIsOpen] = useState();
  return (
    <div>
      <Head>
        <title>Ayush Agrahari - Full-stack Developer & UI/UX Designer</title>
        <meta name="description" content="Ayush Agrahari - Full-stack Developer and UI/UX Designer creating seamless digital experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dev.png" />
      </Head>

      {/* Custom Cursor */}
      <CustomCursor />

      <main>
        {/* Hero Section with Light Theme - z-0 so banner can overlap on top when parallax scrolls */}
        <div className='relative z-0 bg-lightBg'>
          <Header />
          <Hero setIsOpen={setIsOpen} />
        </div>

        <ScrollMarqueeBanner />

        {/* Rest of the sections with dark theme */}
        <div className='bg-primary text-[#fff] font-poppins'>
          <div id='about'>
            <Skills />
          </div>
          <div id='works'>
            <Projects />
          </div>
          <div id='contact'>
            <Footer />
          </div>

          <Connect isOpen={open} setIsOpen={setIsOpen} />
        </div>
      </main>
    </div>
  )
}
