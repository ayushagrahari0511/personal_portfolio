// lib/gtag.js
export const GA_TRACKING_ID = 'G-NYZRGSDPQ7'; // Replace with your GA ID

// Track pageviews
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};
