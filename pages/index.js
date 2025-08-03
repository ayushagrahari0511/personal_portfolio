import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import Achievements from '../components/Achievements'
import Project2 from '../components/Project2'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ayush Agrahari</title>
        <meta name="description" content="Ayush Agrahari" />
        <link rel="icon" href="/dev.png" />
      </Head>

      <main className='bg-primary text-[#fff] font-poppins'>
        <Hero />
        <Skills />
        <Projects />
        {/* <Project2 /> */}

        
        {/* <Achievements /> */}
        <Footer />
      </main>
    </div>
  )
}
