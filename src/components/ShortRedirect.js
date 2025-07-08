import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShortRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get all shortened URLs
    const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const idx = urls.findIndex(u => u.shortUrl.endsWith(`/s/${id}`));
    if (idx === -1) {
      // Not found, redirect to home
      navigate("/statistics");
      return;
    }
    const url = urls[idx];
    // Get referrer
    const source = document.referrer || 'Direct';
    // Get location (city, country) using ipapi.co
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(loc => {
        const click = {
          timestamp: new Date().toISOString(),
          source,
          location: loc.city ? `${loc.city}, ${loc.country_name}` : loc.country_name || 'Unknown',
        };
        url.clicks = url.clicks || [];
        url.clicks.push(click);
        urls[idx] = url;
        localStorage.setItem('shortenedUrls', JSON.stringify(urls));
        window.location.href = url.originalUrl;
      })
      .catch(() => {
        // If location fails, still log click
        const click = {
          timestamp: new Date().toISOString(),
          source,
          location: 'Unknown',
        };
        url.clicks = url.clicks || [];
        url.clicks.push(click);
        urls[idx] = url;
        localStorage.setItem('shortenedUrls', JSON.stringify(urls));
        window.location.href = url.originalUrl;
      });
  }, [id, navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Redirecting...</h2>
      <p>If you are not redirected, <a href="#" onClick={() => window.location.reload()}>click here</a>.</p>
    </div>
  );
};

export default ShortRedirect;
