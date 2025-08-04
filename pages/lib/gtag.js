// lib/gtag.js
export const GA_TRACKING_ID = 'GTM-WDVX2RMR'; // Replace with your GA ID

// Track pageviews
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};
