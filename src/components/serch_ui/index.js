

import React, { useState } from 'react';
import styled from 'styled-components';


const Input = ({ setResult }) => {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState(7); // default 7 days

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleExpiryChange = (e) => {
    setExpiry(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;

    // Generate shorter random ID (5 chars)
    const shortId = Math.random().toString(36).substring(2, 7);
    const shortUrl = window.location.origin + "/s/" + shortId;
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiry * 24 * 60 * 60 * 1000); // expiry in days

    const newEntry = {
      originalUrl: url,
      shortUrl,
      createdAt: now.toISOString(),
      expiry: expiryDate.toISOString(),
      clicks: [],
    };

    // Save to localStorage
    const prev = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    prev.push(newEntry);
    localStorage.setItem('shortenedUrls', JSON.stringify(prev));

    setResult && setResult(newEntry);
    setUrl("");
    setExpiry(7);
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <input
          type="text"
          autoComplete="off"
          name="url"
          className="input"
          placeholder="Paste your URL here"
          value={url}
          onChange={handleChange}
          style={{ flex: 1, minWidth: 220 }}
        />
        <input
          type="number"
          min={1}
          max={365}
          value={expiry}
          onChange={handleExpiryChange}
          style={{ width: 70, borderRadius: 8, border: '1px solid #1976d2', padding: '0.5em', fontSize: 15 }}
          title="Expiry (days)"
        />
        <span style={{ color: '#1976d2', fontWeight: 500, fontSize: 15 }}>days</span>
        <button type="submit" style={{ borderRadius: 8, padding: '0.7em 1.5em', border: 'none', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: 16 }}>
          Shorten
        </button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    width: 250px;
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 10px rgb(94, 93, 93);
    transition: 300ms ease-in-out;
  }

  .input:focus {
    background-color: white;
    transform: scale(1.09);
    box-shadow: 13px 13px 100pxrgb(201, 128, 128),
               -13px -13px 100px #ffffff;
  }`;

export default Input;
