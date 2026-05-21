import "@radix-ui/themes/styles.css";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import '../styles/globals.css'
import Script from 'next/script';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Theme } from "@radix-ui/themes";
import SmoothScroll from '../components/SmoothScroll';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Connect from '../components/Connect';
import CustomCursor from '../components/CustomCursor';

const projectId = "u6f0gmkq07"

function MyApp({ Component, pageProps }) {
  const [connectOpen, setConnectOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${projectId}");`
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
      >{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}');
      `}</Script>
      <Theme>
        <SmoothScroll>
          <CustomCursor />
          <Header setConnectOpen={setConnectOpen} />
          <Component {...pageProps} setConnectOpen={setConnectOpen} connectOpen={connectOpen} />
          <div id="contact">
            <Footer setConnectOpen={setConnectOpen} />
          </div>
          <Connect isOpen={connectOpen} setIsOpen={setConnectOpen} />
        </SmoothScroll>
      </Theme>
    </>
  )
}

export default MyApp
