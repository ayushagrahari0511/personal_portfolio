import Head from 'next/head'
import Hero from '../components/Hero'
import SkillsShowcase from '../components/SkillsShowcase'
import Projects from '../components/Projects'
import ScrollMarqueeBanner from '../components/ScrollMarqueeBanner'
import AboutParallaxSection from '../components/AboutParallaxSection'
import ContactBanner from '../components/ContactBanner'

export default function Home({ setConnectOpen }) {
  return (
    <div>
      <Head>
        <title>Ayush Agrahari - Full-stack Developer & UI/UX Designer</title>
        <meta name="description" content="Ayush Agrahari - Full-stack Developer and UI/UX Designer creating seamless digital experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dev.png" />
      </Head>

      <main>
        {/* Hero Section with Light Theme - z-0 so banner can overlap on top when parallax scrolls */}
        <div className='relative z-0 bg-lightBg'>
          <Hero setIsOpen={setConnectOpen} />
        </div>

        <ScrollMarqueeBanner />
        <AboutParallaxSection />
        <SkillsShowcase />

        {/* Rest of the sections with dark theme */}
        <div className='bg-primary text-[#fff] font-poppins relative z-[100]'>
          <div id='works'>
            <Projects />
          </div>

          <ContactBanner setConnectOpen={setConnectOpen} />
        </div>
      </main>
    </div>
  )
}
