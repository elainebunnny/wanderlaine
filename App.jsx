import React, { useState, useEffect, useRef, useMemo } from 'react'
import { INIT_PLACES, INIT_STORIES } from './data.js'

// ===================== CONSTANTS =====================

const CATEGORY_META = {
  'restaurant-bar': { label: 'Restaurant & Bar', icon: '🍽', color: '#E53E3E' },
  accommodation:    { label: 'Accommodation',   icon: '🏨', color: '#3182CE' },
  activity:         { label: 'Activities',       icon: '⛩', color: '#38A169' }
}

const TAG_META = {
  'michelin-guide':    { label: 'Michelin Guide',    color: '#B91C1C', categories: ['restaurant-bar'] },
  'top-50':            { label: 'Top 50',            color: '#B45309', categories: ['restaurant-bar'] },
  'locals-favorite':   { label: "Local's Favorite",  color: '#15803D', categories: ['restaurant-bar'] },
  premium:             { label: 'Premium',           color: '#7C3AED', categories: ['accommodation'] },
  economical:          { label: 'Economical',        color: '#0D9488', categories: ['accommodation'] },
  bnb:                 { label: 'B&B',               color: '#C2410C', categories: ['accommodation'] },
  'hotel-type':        { label: 'Hotel',             color: '#4338CA', categories: ['accommodation'] },
  outdoor:             { label: 'Outdoor',           color: '#16A34A', categories: ['activity'] },
  'local-experience':  { label: 'Local Experience',  color: '#CA8A04', categories: ['activity'] },
  sightseeing:         { label: 'Sightseeing',       color: '#2563EB', categories: ['activity'] },
  shopping:            { label: 'Shopping',          color: '#DB2777', categories: ['activity'] },
  'unique-experience': { label: 'Unique Experience', color: '#7C3AED', categories: ['restaurant-bar', 'accommodation', 'activity'] }
}

const STORAGE_KEY = 'wanderlaine-data'
const ADMIN_PASSWORD = 'travel2025'
const AI_MODEL = 'claude-sonnet-4-20250514'

// ===================== STYLES =====================

const STYLES_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: #FAF7F2;
    color: #2C2825;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', Georgia, serif; margin: 0; font-weight: 600; }
  ::selection { background: rgba(212, 160, 83, 0.35); color: #2C2825; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #E4DED5; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #D4A053; }

  /* Focus */
  input:focus, textarea:focus, select:focus, button:focus-visible {
    outline: none;
    border-color: #D4A053 !important;
    box-shadow: 0 0 0 3px rgba(212, 160, 83, 0.18) !important;
  }

  .app { max-width: 900px; margin: 0 auto; padding: 0 16px 80px; }

  /* Header */
  .header {
    position: sticky; top: 0; z-index: 40;
    margin: 0 -16px 0;
    padding: 28px 24px 22px;
    background: linear-gradient(135deg, #2C2825 0%, #4A3F37 100%);
    color: #FAF7F2;
    border-bottom: 1px solid rgba(212, 160, 83, 0.25);
  }
  .header-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  .brand { display: flex; align-items: baseline; gap: 12px; }
  .brand-name { font-size: 32px; letter-spacing: 0.5px; color: #FAF7F2; }
  .brand-accent { color: #D4A053; }
  .brand-tagline { font-size: 13px; color: rgba(250, 247, 242, 0.7); font-style: italic; }
  .header-stats { display: flex; gap: 18px; font-size: 13px; color: rgba(250, 247, 242, 0.85); }
  .header-stats strong { display: block; font-size: 22px; font-family: 'Playfair Display', serif; color: #D4A053; font-weight: 600; }

  /* Nav */
  .nav {
    position: sticky; top: 0; z-index: 30;
    margin: 0 -16px;
    background: #FAF7F2;
    border-bottom: 1px solid #EAE4DA;
    overflow-x: auto;
  }
  .nav-inner { max-width: 900px; margin: 0 auto; display: flex; gap: 4px; padding: 0 16px; }
  .nav button {
    flex: 0 0 auto;
    background: none; border: none;
    padding: 14px 18px;
    font: inherit; font-weight: 500;
    color: #8A8580;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .nav button:hover { color: #2C2825; }
  .nav button.active { color: #2C2825; border-bottom-color: #D4A053; }

  /* Cards */
  .card {
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(44, 40, 37, 0.06), 0 4px 12px rgba(44, 40, 37, 0.04);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 3px 8px rgba(44, 40, 37, 0.08), 0 12px 28px rgba(44, 40, 37, 0.08); }

  .place-card { cursor: pointer; display: flex; flex-direction: column; }
  .place-card-photo { width: 100%; height: 180px; object-fit: cover; display: block; background: #EFEAE1; }
  .place-card-body { padding: 16px 18px 18px; }
  .place-card-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #8A8580; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .place-card-name { font-size: 20px; font-family: 'Playfair Display', serif; color: #2C2825; line-height: 1.25; margin-bottom: 4px; }
  .place-card-location { font-size: 13px; color: #8A8580; margin-bottom: 10px; }
  .place-card-review {
    font-size: 14px; color: #2C2825; line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden; text-overflow: ellipsis; margin-bottom: 12px;
  }
  .place-card-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .stars { color: #D4A053; letter-spacing: 1px; font-size: 14px; }
  .stars-empty { color: #E4DED5; }

  .map-link {
    font-size: 12px; color: #8A8580; text-decoration: none;
    padding: 4px 8px; border-radius: 6px; transition: all 0.15s ease;
  }
  .map-link:hover { color: #D4A053; background: rgba(212, 160, 83, 0.08); }

  /* Tag pill */
  .tag {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 600;
    padding: 3px 9px; border-radius: 999px;
    color: white; letter-spacing: 0.3px; white-space: nowrap;
  }
  .tag-row { display: flex; flex-wrap: wrap; gap: 6px; }

  /* Filter pills */
  .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .filter-label { font-size: 11px; font-weight: 600; color: #8A8580; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; display: block; }
  .pill {
    background: #FFFFFF; border: 1px solid #EAE4DA;
    padding: 7px 14px; border-radius: 999px;
    font-size: 13px; font-weight: 500; color: #2C2825;
    cursor: pointer; transition: all 0.15s ease;
  }
  .pill:hover { border-color: #D4A053; color: #2C2825; }
  .pill.active { background: #2C2825; color: #FAF7F2; border-color: #2C2825; }
  .pill.tag-pill.active { background: var(--tag-color, #2C2825); border-color: var(--tag-color, #2C2825); }

  /* Inputs */
  .input, .textarea, .select {
    width: 100%;
    padding: 11px 14px;
    font: inherit; font-size: 14px; color: #2C2825;
    background: #FFFFFF;
    border: 1px solid #EAE4DA;
    border-radius: 10px;
    transition: all 0.15s ease;
  }
  .textarea { resize: vertical; min-height: 90px; font-family: inherit; line-height: 1.5; }
  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: #2C2825; margin-bottom: 6px; letter-spacing: 0.3px; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 10px 18px;
    border: none; border-radius: 10px;
    font: inherit; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease;
    text-decoration: none;
  }
  .btn-primary { background: #D4A053; color: white; }
  .btn-primary:hover { background: #B88740; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: #2C2825; border: 1px solid #2C2825; }
  .btn-outline:hover { background: #2C2825; color: white; }
  .btn-ghost { background: transparent; color: #8A8580; }
  .btn-ghost:hover { color: #2C2825; background: #F4EFE5; }
  .btn-danger { background: transparent; color: #B91C1C; border: 1px solid rgba(185, 28, 28, 0.3); }
  .btn-danger:hover { background: #B91C1C; color: white; }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-group-two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  /* Search bar */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: #FFFFFF; border: 1px solid #EAE4DA;
    padding: 4px 4px 4px 16px; border-radius: 12px;
    margin-bottom: 20px;
    transition: all 0.15s ease;
  }
  .search-bar:focus-within { border-color: #D4A053; box-shadow: 0 0 0 3px rgba(212, 160, 83, 0.18); }
  .search-bar input { flex: 1; border: none; outline: none; padding: 12px 0; font: inherit; font-size: 15px; background: transparent; color: #2C2825; }
  .search-bar input::placeholder { color: #B8B1A6; }

  .toggle-group { display: inline-flex; background: #F4EFE5; border-radius: 10px; padding: 3px; }
  .toggle-group button { background: none; border: none; font: inherit; font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 7px; color: #8A8580; cursor: pointer; transition: all 0.15s ease; }
  .toggle-group button.active { background: #FFFFFF; color: #2C2825; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

  /* Place detail */
  .back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; margin: 16px 0; border-radius: 8px; background: transparent; border: none; color: #8A8580; font: inherit; font-size: 14px; cursor: pointer; }
  .back-btn:hover { color: #2C2825; background: #F4EFE5; }
  .hero {
    height: 280px; border-radius: 14px; overflow: hidden;
    background: linear-gradient(135deg, #2C2825 0%, #4A3F37 100%);
    position: relative; margin-bottom: 20px;
    display: flex; align-items: flex-end;
    box-shadow: 0 8px 24px rgba(44, 40, 37, 0.15);
  }
  .hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%); }
  .hero-content { position: relative; z-index: 2; padding: 22px 26px; color: #FAF7F2; width: 100%; }
  .hero-category { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #D4A053; margin-bottom: 6px; font-weight: 600; }
  .hero-title { font-size: 34px; line-height: 1.15; margin-bottom: 4px; }
  .hero-sub { font-size: 14px; color: rgba(250, 247, 242, 0.8); }

  .section { margin: 22px 0; }
  .section-title { font-size: 16px; font-weight: 600; color: #2C2825; font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px; margin-bottom: 10px; text-transform: uppercase; font-size: 12px; color: #8A8580; }

  .review-text { font-size: 15px; line-height: 1.7; color: #2C2825; white-space: pre-wrap; }

  .pro-tip {
    background: #FFF8ED; border: 1px solid #F0E4CF;
    border-radius: 12px; padding: 16px 18px;
    display: flex; gap: 12px; align-items: flex-start;
  }
  .pro-tip-icon { font-size: 20px; flex-shrink: 0; }
  .pro-tip-body { flex: 1; }
  .pro-tip-label { font-size: 11px; font-weight: 700; color: #B88740; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px; }
  .pro-tip-text { font-size: 14px; color: #2C2825; line-height: 1.55; }

  /* Comments */
  .comment { padding: 14px 0; border-bottom: 1px solid #EAE4DA; }
  .comment:last-child { border-bottom: none; }
  .comment-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .comment-author { font-weight: 600; font-size: 14px; color: #2C2825; }
  .comment-date { font-size: 11px; color: #B8B1A6; }
  .comment-rating { font-size: 13px; }
  .comment-text { font-size: 14px; line-height: 1.55; color: #2C2825; }

  .rate-picker { display: inline-flex; gap: 2px; }
  .rate-picker button { background: none; border: none; padding: 2px; font-size: 22px; color: #E4DED5; cursor: pointer; transition: color 0.12s ease, transform 0.1s ease; line-height: 1; }
  .rate-picker button.on { color: #D4A053; }
  .rate-picker button:hover { transform: scale(1.15); color: #B88740; }

  /* Empty state */
  .empty { padding: 60px 20px; text-align: center; color: #8A8580; }
  .empty-icon { font-size: 48px; margin-bottom: 14px; opacity: 0.6; }
  .empty-title { font-size: 18px; font-family: 'Playfair Display', serif; color: #2C2825; margin-bottom: 6px; }
  .empty-text { font-size: 14px; }

  /* Map */
  .map-wrap {
    height: 480px; border-radius: 12px; overflow: hidden;
    border: 1px solid #EAE4DA;
    box-shadow: 0 2px 8px rgba(44, 40, 37, 0.06);
    background: #EFEAE1;
  }
  .map-legend {
    display: flex; gap: 16px; flex-wrap: wrap;
    margin-top: 12px; padding: 10px 14px;
    background: #FFFFFF; border: 1px solid #EAE4DA; border-radius: 10px;
    font-size: 12px; color: #2C2825;
  }
  .legend-item { display: flex; align-items: center; gap: 6px; }
  .legend-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.15); }
  .legend-count { margin-left: auto; color: #8A8580; }

  .map-pin-marker div { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); color: white; font-size: 13px; font-weight: 700; }

  /* Leaflet popup override */
  .leaflet-popup-content-wrapper { border-radius: 10px; box-shadow: 0 4px 16px rgba(44, 40, 37, 0.18); }
  .leaflet-popup-content { margin: 12px 14px; font-family: 'DM Sans', sans-serif; }
  .popup-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: #2C2825; margin-bottom: 2px; }
  .popup-meta { font-size: 12px; color: #8A8580; margin-bottom: 6px; }
  .popup-link { font-size: 13px; color: #D4A053; text-decoration: none; font-weight: 600; cursor: pointer; }
  .popup-link:hover { text-decoration: underline; }

  /* Chapters (grid) */
  .grid-chapters { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .chapter-card { cursor: pointer; display: flex; flex-direction: column; overflow: hidden; }
  .chapter-cover {
    height: 160px; background: linear-gradient(135deg, #3A332C 0%, #2C2825 50%, #D4A053 200%);
    background-size: cover; background-position: center;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .chapter-cover::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.25)); }
  .chapter-cover-initial {
    font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 600;
    color: rgba(212, 160, 83, 0.35); z-index: 1;
  }
  .chapter-card-body { padding: 16px 18px 18px; }
  .chapter-card-country { font-size: 11px; letter-spacing: 1px; color: #D4A053; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; }
  .chapter-card-title { font-size: 22px; font-family: 'Playfair Display', serif; color: #2C2825; line-height: 1.2; margin-bottom: 8px; }
  .chapter-card-excerpt {
    font-size: 13px; color: #5A5450; line-height: 1.55; margin-bottom: 12px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden; text-overflow: ellipsis;
  }
  .chapter-indicators { display: flex; flex-wrap: wrap; gap: 8px; font-size: 11px; color: #8A8580; font-weight: 500; }
  .chapter-indicators span { background: #F4EFE5; padding: 3px 8px; border-radius: 999px; }

  /* Chapter detail */
  .story-hero {
    height: 280px; border-radius: 14px; overflow: hidden; margin-bottom: 24px;
    background: linear-gradient(135deg, #2C2825 0%, #4A3F37 50%, #5A4A3A 100%);
    background-size: cover; background-position: center;
    display: flex; align-items: flex-end;
    box-shadow: 0 8px 24px rgba(44, 40, 37, 0.15);
  }
  .story-hero-content { padding: 28px 32px; color: #FAF7F2; width: 100%; }
  .story-hero-country { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #D4A053; font-weight: 600; margin-bottom: 6px; }
  .story-hero-title { font-size: 42px; line-height: 1.1; color: #FAF7F2; }

  .chapter-section { margin: 28px 0; }
  .chapter-section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #EAE4DA; }
  .chapter-section-icon { font-size: 20px; }
  .chapter-section-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #2C2825; }
  .chapter-section-tagline { font-size: 14px; color: #8A8580; font-style: italic; margin: 8px 0 0; line-height: 1.5; }
  .chapter-section-body.prose { font-size: 15px; line-height: 1.75; color: #2C2825; white-space: pre-wrap; }

  /* Gallery (chapter view) */
  .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  .gallery-item { position: relative; border-radius: 10px; overflow: hidden; background: #EFEAE1; aspect-ratio: 4/3; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .gallery-item.clickable { cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .gallery-item.clickable:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-item-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    font-size: 36px; color: #C9C0B3;
  }
  .gallery-item-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 10px 12px 8px;
    background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
    color: #FAF7F2; font-size: 12px; font-weight: 500;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
  }
  .gallery-item-link { color: #D4A053; font-weight: 600; white-space: nowrap; }

  /* Day timeline (used in chapter itinerary section) */
  .day-row { display: flex; gap: 16px; padding-bottom: 20px; position: relative; }
  .day-row:not(:last-child)::before {
    content: ''; position: absolute;
    left: 17px; top: 38px; bottom: 0;
    width: 2px; background: #EAE4DA;
  }
  .day-circle {
    flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
    background: #2C2825; color: #D4A053;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-weight: 600; font-size: 15px;
    z-index: 1;
  }
  .day-body { flex: 1; padding-top: 4px; }
  .day-title { font-size: 17px; font-family: 'Playfair Display', serif; margin-bottom: 4px; }
  .day-notes { font-size: 14px; color: #5A5450; line-height: 1.6; white-space: pre-wrap; }

  /* Editor sections (admin) */
  .editor-section {
    margin: 20px 0; padding: 16px;
    background: #FAF7F2; border: 1px solid #EAE4DA; border-radius: 10px;
  }
  .editor-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; gap: 10px; flex-wrap: wrap; }
  .editor-section-body { margin-top: 12px; }

  /* Day editor rows */
  .day-editor { background: #FFFFFF; border: 1px solid #EAE4DA; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
  .day-editor-head { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
  .day-num-input { max-width: 70px; flex-shrink: 0; }

  /* Gallery editor rows */
  .gallery-editor-row { display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: #FFFFFF; border: 1px solid #EAE4DA; border-radius: 8px; margin-bottom: 10px; }
  .gallery-editor-thumb { flex-shrink: 0; width: 100px; height: 75px; border-radius: 6px; overflow: hidden; background: #EFEAE1; }
  .gallery-editor-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .gallery-editor-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #C9C0B3; }
  .gallery-editor-fields { flex: 1; min-width: 0; }

  /* Legacy itinerary classes (kept for any cached refs) */
  .itinerary-card { padding: 20px 22px; cursor: pointer; }
  .itinerary-title { font-size: 22px; font-family: 'Playfair Display', serif; margin-bottom: 4px; }
  .itinerary-country { display: inline-block; font-size: 11px; padding: 3px 8px; background: #F4EFE5; color: #8A8580; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .itinerary-desc { font-size: 14px; color: #5A5450; line-height: 1.55; margin-bottom: 12px; }
  .itinerary-meta { font-size: 12px; color: #8A8580; font-weight: 500; }

  /* Chat */
  .chat-window {
    height: 460px; display: flex; flex-direction: column;
    background: #FFFFFF; border-radius: 12px; border: 1px solid #EAE4DA;
    overflow: hidden; margin-bottom: 14px;
  }
  .chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .chat-msg { max-width: 80%; padding: 12px 16px; border-radius: 14px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }
  .chat-msg.user { align-self: flex-end; background: #2C2825; color: #FAF7F2; border-bottom-right-radius: 4px; }
  .chat-msg.assistant { align-self: flex-start; background: #F4EFE5; color: #2C2825; border-bottom-left-radius: 4px; }
  .chat-msg.thinking { color: #8A8580; font-style: italic; animation: pulse 1.4s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

  .chat-input-row { display: flex; gap: 8px; align-items: flex-end; }
  .chat-input-row .textarea { flex: 1; min-height: 46px; max-height: 140px; }

  /* Admin */
  .admin-gate { padding: 40px 20px; text-align: center; }
  .admin-gate h2 { margin-bottom: 10px; font-size: 26px; }
  .admin-gate p { color: #8A8580; margin-bottom: 20px; }
  .admin-gate .input { max-width: 300px; margin: 0 auto 14px; }

  .admin-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 10px; flex-wrap: wrap; }
  .admin-list-item {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 12px 16px;
    background: #FFFFFF; border: 1px solid #EAE4DA; border-radius: 10px;
    margin-bottom: 8px;
  }
  .admin-list-item-info { flex: 1; min-width: 0; }
  .admin-list-item-name { font-weight: 600; color: #2C2825; font-size: 14px; }
  .admin-list-item-meta { font-size: 12px; color: #8A8580; }
  .admin-list-item-actions { display: flex; gap: 6px; flex-shrink: 0; }

  /* Location search (Admin) */
  .loc-search-wrap { position: relative; }
  .loc-search-dropdown {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 10;
    background: #FFFFFF; border: 1px solid #EAE4DA; border-radius: 10px;
    box-shadow: 0 4px 16px rgba(44, 40, 37, 0.12);
    max-height: 280px; overflow-y: auto;
  }
  .loc-search-item { padding: 10px 14px; cursor: pointer; font-size: 13px; border-bottom: 1px solid #F4EFE5; transition: background 0.1s ease; }
  .loc-search-item:last-child { border-bottom: none; }
  .loc-search-item:hover { background: #FAF7F2; }
  .loc-search-item-name { font-weight: 600; color: #2C2825; margin-bottom: 2px; }
  .loc-search-item-detail { font-size: 11px; color: #8A8580; }

  .coord-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: #E8F5E8; color: #15803D; font-size: 12px; border-radius: 6px; font-weight: 500; margin-top: 8px; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #2C2825; color: #FAF7F2;
    padding: 12px 20px; border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    font-size: 14px; z-index: 100;
    animation: fadeIn 0.3s ease-out;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

  /* Utility */
  .stack > * + * { margin-top: 8px; }
  .stack-lg > * + * { margin-top: 20px; }
  .muted { color: #8A8580; font-size: 13px; }
  .grid-places { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

  @media (max-width: 600px) {
    .header { padding: 22px 20px 18px; }
    .brand-name { font-size: 26px; }
    .hero { height: 220px; }
    .hero-title { font-size: 26px; }
    .story-hero { height: 220px; }
    .story-hero-title { font-size: 32px; }
    .story-hero-content { padding: 20px 22px; }
    .input-row { grid-template-columns: 1fr; }
    .grid-places { grid-template-columns: 1fr; }
    .grid-chapters { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-editor-row { flex-wrap: wrap; }
    .gallery-editor-thumb { width: 100%; height: 140px; }
  }
`

// ===================== HELPERS =====================

const uid = () => Math.random().toString(36).slice(2, 10)

const getTagsForCategory = (cat) =>
  Object.entries(TAG_META).filter(([_, meta]) => meta.categories.includes(cat)).map(([k]) => k)

const googleMapsUrl = (p) => {
  const query = [p.name, p.city, p.country].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&query_place_id=`
}
const appleMapsUrl = (p) => `https://maps.apple.com/?q=${encodeURIComponent(p.name)}&ll=${p.lat},${p.lng}`

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return '' }
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      // Migrate legacy `itineraries` (pre-Chapters) to new `stories` shape
      if (!data.stories && Array.isArray(data.itineraries)) {
        data.stories = data.itineraries.map(migrateItineraryToStory)
        delete data.itineraries
      }
      if (!Array.isArray(data.stories)) data.stories = INIT_STORIES
      if (!Array.isArray(data.places)) data.places = INIT_PLACES
      if (!Array.isArray(data.comments)) data.comments = []
      if (!Array.isArray(data.feedback)) data.feedback = []
      return data
    }
  } catch {}
  return {
    places: INIT_PLACES,
    stories: INIT_STORIES,
    comments: [],
    feedback: []
  }
}

function migrateItineraryToStory(it) {
  const parts = (it.title || '').split(' — ')
  const storyTitle = parts.length > 1 ? parts[0] : (it.country || it.title || 'Untitled')
  const itineraryTitle = parts.length > 1 ? parts.slice(1).join(' — ') : (it.title || '')
  return {
    id: (it.id || uid()).replace(/^it/, 'st'),
    title: storyTitle,
    country: it.country || '',
    city: '',
    coverPhoto: null,
    description: '',
    memory: '',
    itinerary: it.days?.length
      ? { title: itineraryTitle, tagline: it.description || '', days: (it.days || []).map(d => ({ day: d.day, title: d.title, notes: d.notes })) }
      : null,
    gallery: []
  }
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

// ===================== SMALL COMPONENTS =====================

function Stars({ value = 0, onChange, size = 14 }) {
  if (onChange) {
    return (
      <div className="rate-picker">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={n <= value ? 'on' : ''}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
          >★</button>
        ))}
      </div>
    )
  }
  return (
    <span className="stars" style={{ fontSize: size }}>
      {'★'.repeat(value)}<span className="stars-empty">{'★'.repeat(5 - value)}</span>
    </span>
  )
}

function Tag({ tagKey }) {
  const meta = TAG_META[tagKey]
  if (!meta) return null
  return <span className="tag" style={{ background: meta.color }}>{meta.label}</span>
}

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [message, onClose])
  if (!message) return null
  return <div className="toast">{message}</div>
}

// ===================== HEADER & NAV =====================

function Header({ places }) {
  const countries = new Set(places.map((p) => p.country)).size
  return (
    <div className="header">
      <div className="header-inner">
        <div className="brand">
          <h1 className="brand-name">Wander<span className="brand-accent">laine</span></h1>
          <span className="brand-tagline">Elaine's travel journal</span>
        </div>
        <div className="header-stats">
          <div><strong>{places.length}</strong>places</div>
          <div><strong>{countries}</strong>countries</div>
        </div>
      </div>
    </div>
  )
}

function Nav({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'explore', label: 'Explore' },
    { key: 'chapters', label: 'Chapters' },
    { key: 'ask', label: 'Ask AI' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'admin', label: 'Admin' }
  ]
  return (
    <div className="nav">
      <div className="nav-inner">
        {tabs.map((t) => (
          <button key={t.key} className={activeTab === t.key ? 'active' : ''} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ===================== MAP VIEW =====================

function MapView({ places, onSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerRef = useRef(null)
  const [leafletReady, setLeafletReady] = useState(!!window.L)

  // Wait for Leaflet to load
  useEffect(() => {
    if (window.L) { setLeafletReady(true); return }
    const i = setInterval(() => {
      if (window.L) { setLeafletReady(true); clearInterval(i) }
    }, 100)
    return () => clearInterval(i)
  }, [])

  // Init map
  useEffect(() => {
    if (!leafletReady || !mapRef.current || mapInstanceRef.current) return
    const L = window.L
    mapInstanceRef.current = L.map(mapRef.current, { scrollWheelZoom: true }).setView([20, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(mapInstanceRef.current)
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [leafletReady])

  // Update markers when places change
  useEffect(() => {
    const L = window.L
    const map = mapInstanceRef.current
    if (!L || !map) return

    if (layerRef.current) { layerRef.current.remove(); layerRef.current = null }

    const group = L.layerGroup().addTo(map)
    const bounds = []

    places.forEach((p) => {
      if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return
      const color = CATEGORY_META[p.category]?.color || '#8A8580'
      const icon = L.divIcon({
        className: 'map-pin-marker',
        html: `<div style="background:${color}">${CATEGORY_META[p.category]?.icon || '•'}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
      const marker = L.marker([p.lat, p.lng], { icon })
      const popupHtml = `
        <div class="popup-title">${escapeHtml(p.name)}</div>
        <div class="popup-meta">${escapeHtml(p.city)}, ${escapeHtml(p.country)} · ${'★'.repeat(p.rating)}</div>
        <a class="popup-link" data-place-id="${p.id}">View details →</a>
      `
      marker.bindPopup(popupHtml)
      marker.on('popupopen', (e) => {
        const el = e.popup.getElement()
        const link = el?.querySelector('.popup-link')
        if (link) link.onclick = () => onSelect(p.id)
      })
      marker.addTo(group)
      bounds.push([p.lat, p.lng])
    })

    layerRef.current = group

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 })
    } else {
      map.setView([20, 0], 2)
    }
  }, [places, onSelect])

  // Counts by category
  const counts = useMemo(() => {
    const c = { 'restaurant-bar': 0, accommodation: 0, activity: 0 }
    places.forEach((p) => { if (c[p.category] !== undefined) c[p.category]++ })
    return c
  }, [places])

  return (
    <>
      <div className="map-wrap" ref={mapRef} />
      <div className="map-legend">
        {Object.entries(CATEGORY_META).map(([key, meta]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: meta.color }} />
            <span>{meta.label}</span>
            <span className="legend-count">({counts[key] || 0})</span>
          </div>
        ))}
        <div className="legend-item" style={{ marginLeft: 'auto' }}>
          <span className="legend-count">{places.length} pin{places.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </>
  )
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

// ===================== EXPLORE TAB =====================

function ExploreTab({ places, onSelectPlace }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [view, setView] = useState('list')

  // Reset tags that aren't valid for selected category
  useEffect(() => {
    if (category === 'all') return
    setSelectedTags((prev) => prev.filter((t) => TAG_META[t]?.categories.includes(category)))
  }, [category])

  const countries = useMemo(
    () => [...new Set(places.map((p) => p.country))].sort(),
    [places]
  )
  const cities = useMemo(() => {
    const rel = country ? places.filter((p) => p.country === country) : places
    return [...new Set(rel.map((p) => p.city))].sort()
  }, [places, country])

  const tagOptions = useMemo(() => {
    if (category === 'all') return Object.keys(TAG_META)
    return Object.keys(TAG_META).filter((k) => TAG_META[k].categories.includes(category))
  }, [category])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return places.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (country && p.country !== country) return false
      if (city && p.city !== city) return false
      if (selectedTags.length > 0 && !selectedTags.every((t) => (p.tags || []).includes(t))) return false
      if (q) {
        const hay = [p.name, p.city, p.country, p.comment, p.proTip, p.address].join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [places, search, category, country, city, selectedTags])

  const toggleTag = (t) => setSelectedTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])

  return (
    <div>
      <div className="search-bar">
        <span style={{ color: '#B8B1A6', fontSize: 18 }}>🔍</span>
        <input
          type="text"
          value={search}
          placeholder="Search places, cities, countries, or reviews…"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="toggle-group">
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>List</button>
          <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>Map</button>
        </div>
      </div>

      <div className="stack-lg">
        <div>
          <span className="filter-label">Category</span>
          <div className="filter-row">
            <button className={`pill ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>All</button>
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <button
                key={key}
                className={`pill ${category === key ? 'active' : ''}`}
                onClick={() => setCategory(key)}
              >{meta.icon} {meta.label}</button>
            ))}
          </div>
        </div>

        <div className="input-row">
          <div>
            <span className="filter-label">Country</span>
            <select className="select" value={country} onChange={(e) => { setCountry(e.target.value); setCity('') }}>
              <option value="">All countries</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <span className="filter-label">City</span>
            <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {tagOptions.length > 0 && (
          <div>
            <span className="filter-label">Tags</span>
            <div className="filter-row">
              {tagOptions.map((t) => {
                const meta = TAG_META[t]
                const active = selectedTags.includes(t)
                return (
                  <button
                    key={t}
                    className={`pill tag-pill ${active ? 'active' : ''}`}
                    style={active ? { '--tag-color': meta.color } : {}}
                    onClick={() => toggleTag(t)}
                  >{meta.label}</button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ margin: '18px 0 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="muted">{filtered.length} place{filtered.length !== 1 ? 's' : ''}</span>
        {(search || category !== 'all' || country || city || selectedTags.length > 0) && (
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setCategory('all'); setCountry(''); setCity(''); setSelectedTags([]) }}>
            Clear filters
          </button>
        )}
      </div>

      {view === 'map' ? (
        <MapView places={filtered} onSelect={onSelectPlace} />
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🗺️</div>
          <div className="empty-title">No places match</div>
          <div className="empty-text">Try clearing some filters or broadening your search.</div>
        </div>
      ) : (
        <div className="grid-places">
          {filtered.map((p) => <PlaceCard key={p.id} place={p} onClick={() => onSelectPlace(p.id)} />)}
        </div>
      )}
    </div>
  )
}

function PlaceCard({ place, onClick }) {
  const meta = CATEGORY_META[place.category] || {}
  return (
    <div className="card place-card" onClick={onClick}>
      {place.photo && <img src={place.photo} alt={place.name} className="place-card-photo" />}
      <div className="place-card-body">
        <div className="place-card-meta">
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
        </div>
        <h3 className="place-card-name">{place.name}</h3>
        <div className="place-card-location">{place.city}, {place.country}</div>
        {place.comment && <div className="place-card-review">{place.comment}</div>}
        {place.tags?.length > 0 && (
          <div className="tag-row" style={{ marginBottom: 10 }}>
            {place.tags.map((t) => <Tag key={t} tagKey={t} />)}
          </div>
        )}
        <div className="place-card-footer">
          <Stars value={place.rating || 0} />
          <a
            className="map-link"
            href={googleMapsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >📍 Map</a>
        </div>
      </div>
    </div>
  )
}

// ===================== PLACE DETAIL =====================

function PlaceDetail({ place, comments, onBack, onAddComment }) {
  const meta = CATEGORY_META[place.category] || {}
  const placeComments = comments.filter((c) => c.placeId === place.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const [cmtName, setCmtName] = useState('')
  const [cmtRating, setCmtRating] = useState(5)
  const [cmtMessage, setCmtMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!cmtName.trim() || !cmtMessage.trim()) return
    onAddComment({
      id: uid(),
      placeId: place.id,
      name: cmtName.trim(),
      rating: cmtRating,
      message: cmtMessage.trim(),
      createdAt: new Date().toISOString()
    })
    setCmtName(''); setCmtMessage(''); setCmtRating(5)
  }

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="hero">
        {place.photo && <img src={place.photo} alt={place.name} />}
        <div className="hero-content">
          <div className="hero-category">{meta.icon} {meta.label}</div>
          <h1 className="hero-title">{place.name}</h1>
          <div className="hero-sub">{place.city}, {place.country}</div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Stars value={place.rating || 0} size={16} />
            {place.tags?.length > 0 && <div className="tag-row">{place.tags.map((t) => <Tag key={t} tagKey={t} />)}</div>}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">My Review</div>
        <div className="review-text">{place.comment || <span className="muted">No review yet.</span>}</div>
      </div>

      {place.proTip && (
        <div className="section">
          <div className="pro-tip">
            <div className="pro-tip-icon">💡</div>
            <div className="pro-tip-body">
              <div className="pro-tip-label">Pro Tip</div>
              <div className="pro-tip-text">{place.proTip}</div>
            </div>
          </div>
        </div>
      )}

      <div className="section">
        <div className="btn-group-two">
          <a className="btn btn-primary" href={googleMapsUrl(place)} target="_blank" rel="noopener noreferrer">📍 Google Maps</a>
          <a className="btn btn-outline" href={appleMapsUrl(place)} target="_blank" rel="noopener noreferrer">🍎 Apple Maps</a>
        </div>
        {place.address && <div className="muted" style={{ marginTop: 10, textAlign: 'center' }}>{place.address}</div>}
      </div>

      <div className="section">
        <div className="section-title">Visitor Comments ({placeComments.length})</div>
        {placeComments.length === 0 ? (
          <div className="muted" style={{ padding: '10px 0' }}>No comments yet — be the first to share your experience.</div>
        ) : (
          <div className="card" style={{ padding: '4px 18px' }}>
            {placeComments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-head">
                  <div>
                    <span className="comment-author">{c.name}</span>
                    <span className="comment-rating" style={{ marginLeft: 10 }}>
                      <Stars value={c.rating || 0} />
                    </span>
                  </div>
                  <span className="comment-date">{formatDate(c.createdAt)}</span>
                </div>
                <div className="comment-text">{c.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <div className="section-title">Leave a Comment</div>
        <form onSubmit={submit} className="card" style={{ padding: 18 }}>
          <div className="form-group">
            <label className="form-label">Your name</label>
            <input className="input" value={cmtName} onChange={(e) => setCmtName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Rating</label>
            <Stars value={cmtRating} onChange={setCmtRating} />
          </div>
          <div className="form-group">
            <label className="form-label">Your comment</label>
            <textarea className="textarea" value={cmtMessage} onChange={(e) => setCmtMessage(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Post comment</button>
        </form>
      </div>
    </div>
  )
}

// ===================== CHAPTERS (Stories) =====================

function StoriesTab({ stories, onSelect }) {
  const [country, setCountry] = useState('')
  const countries = useMemo(() => [...new Set(stories.map(s => s.country).filter(Boolean))].sort(), [stories])
  const filtered = country ? stories.filter(s => s.country === country) : stories

  if (stories.length === 0) {
    return <div className="empty"><div className="empty-icon">📖</div><div className="empty-title">No chapters yet</div><div className="empty-text">Add one from the Admin tab.</div></div>
  }

  return (
    <div style={{ marginTop: 16 }}>
      {countries.length > 1 && (
        <div className="filter-row" style={{ marginBottom: 18 }}>
          <button className={`pill ${country === '' ? 'active' : ''}`} onClick={() => setCountry('')}>All</button>
          {countries.map(c => (
            <button key={c} className={`pill ${country === c ? 'active' : ''}`} onClick={() => setCountry(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="grid-chapters">
        {filtered.map(s => <ChapterCard key={s.id} story={s} onClick={() => onSelect(s.id)} />)}
      </div>
    </div>
  )
}

function ChapterCard({ story, onClick }) {
  const has = {
    description: !!story.description?.trim(),
    memory: !!story.memory?.trim(),
    itinerary: !!story.itinerary?.days?.length,
    gallery: !!story.gallery?.length
  }
  const indicators = [
    has.description && '📝 About',
    has.memory && '💭 Story',
    has.itinerary && `🗓️ ${story.itinerary.days.length}-day plan`,
    has.gallery && `📸 ${story.gallery.length} photo${story.gallery.length !== 1 ? 's' : ''}`
  ].filter(Boolean)

  return (
    <div className="card chapter-card" onClick={onClick}>
      <div className="chapter-cover" style={story.coverPhoto ? { backgroundImage: `url(${story.coverPhoto})` } : {}}>
        {!story.coverPhoto && <span className="chapter-cover-initial">{story.title.charAt(0)}</span>}
      </div>
      <div className="chapter-card-body">
        <div className="chapter-card-country">{story.country}{story.city && story.city !== story.title ? ` · ${story.city}` : ''}</div>
        <h3 className="chapter-card-title">{story.title}</h3>
        {(story.description || story.itinerary?.tagline) && (
          <p className="chapter-card-excerpt">{story.description || story.itinerary?.tagline}</p>
        )}
        {indicators.length > 0 && (
          <div className="chapter-indicators">{indicators.map((x, i) => <span key={i}>{x}</span>)}</div>
        )}
      </div>
    </div>
  )
}

function StoryDetail({ story, places, onBack, onOpenPlace }) {
  return (
    <div>
      <button className="back-btn" onClick={onBack}>← All chapters</button>

      <div className="story-hero" style={story.coverPhoto ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url(${story.coverPhoto})` } : {}}>
        <div className="story-hero-content">
          <div className="story-hero-country">{story.country}{story.city && story.city !== story.title ? ` · ${story.city}` : ''}</div>
          <h1 className="story-hero-title">{story.title}</h1>
        </div>
      </div>

      {story.description?.trim() && (
        <section className="chapter-section">
          <div className="chapter-section-header">
            <span className="chapter-section-icon">📝</span>
            <h2 className="chapter-section-title">About</h2>
          </div>
          <div className="chapter-section-body prose">{story.description}</div>
        </section>
      )}

      {story.memory?.trim() && (
        <section className="chapter-section">
          <div className="chapter-section-header">
            <span className="chapter-section-icon">💭</span>
            <h2 className="chapter-section-title">My Memory</h2>
          </div>
          <div className="chapter-section-body prose">{story.memory}</div>
        </section>
      )}

      {story.itinerary?.days?.length > 0 && (
        <section className="chapter-section">
          <div className="chapter-section-header">
            <span className="chapter-section-icon">🗓️</span>
            <h2 className="chapter-section-title">{story.itinerary.title || 'Itinerary'}</h2>
          </div>
          {story.itinerary.tagline && <p className="chapter-section-tagline">{story.itinerary.tagline}</p>}
          <div className="chapter-section-body" style={{ marginTop: 14 }}>
            {story.itinerary.days.map((d, i) => (
              <div key={i} className="day-row">
                <div className="day-circle">{d.day}</div>
                <div className="day-body">
                  <h4 className="day-title">{d.title}</h4>
                  <div className="day-notes">{d.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {story.gallery?.length > 0 && (
        <section className="chapter-section">
          <div className="chapter-section-header">
            <span className="chapter-section-icon">📸</span>
            <h2 className="chapter-section-title">Gallery</h2>
          </div>
          <div className="gallery-grid">
            {story.gallery.map((g, i) => {
              const linkedPlace = g.placeId ? places.find(p => p.id === g.placeId) : null
              const photo = g.photo || linkedPlace?.photo
              const caption = g.caption || linkedPlace?.name || ''
              const clickable = !!linkedPlace
              return (
                <div
                  key={g.id || i}
                  className={`gallery-item ${clickable ? 'clickable' : ''}`}
                  onClick={() => clickable && onOpenPlace(linkedPlace.id)}
                >
                  {photo ? (
                    <img src={photo} alt={caption} />
                  ) : (
                    <div className="gallery-item-placeholder">📷</div>
                  )}
                  {(caption || clickable) && (
                    <div className="gallery-item-caption">
                      <span>{caption}</span>
                      {clickable && <span className="gallery-item-link">View →</span>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {!story.description?.trim() && !story.memory?.trim() && !story.itinerary?.days?.length && !story.gallery?.length && (
        <div className="empty"><div className="empty-icon">✨</div><div className="empty-title">This chapter is empty</div><div className="empty-text">Add content from the Admin tab.</div></div>
      )}
    </div>
  )
}

// ===================== ASK AI =====================

function AskAITab({ places, stories }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  // Build a compact summary for the system prompt
  const summary = useMemo(() => {
    const placeLines = places.map((p) => {
      const tags = p.tags?.length ? ` [${p.tags.join(', ')}]` : ''
      return `- ${p.name} (${p.city}, ${p.country}, ${CATEGORY_META[p.category]?.label || p.category}, ${p.rating}/5)${tags}: ${p.comment || ''}${p.proTip ? ` // Tip: ${p.proTip}` : ''}`
    }).join('\n')
    const storyLines = stories.map((s) => {
      const dayCount = s.itinerary?.days?.length || 0
      const parts = [
        s.description && `About: ${s.description.slice(0, 200)}`,
        s.memory && `Memory: ${s.memory.slice(0, 200)}`,
        dayCount > 0 && `${dayCount}-day itinerary "${s.itinerary.title}": ${s.itinerary.tagline || ''}`
      ].filter(Boolean)
      return `- ${s.title} (${s.country}): ${parts.join(' | ')}`
    }).join('\n')
    return `PLACES (${places.length}):\n${placeLines}\n\nCHAPTERS (${stories.length}):\n${storyLines}`
  }, [places, stories])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply || "Sorry — I didn't get a response." }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Network hiccup — please try again." }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <div style={{ marginTop: 20 }}>
      <div className="muted" style={{ marginBottom: 14 }}>
        Ask me anything about Elaine's {places.length} places and {stories.length} chapters. I only recommend from this collection.
      </div>
      <div className="chat-window">
        <div className="chat-messages" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="muted" style={{ textAlign: 'center', padding: '40px 20px', fontSize: 14 }}>
              👋 Try: <em>"Where should I eat in Vancouver?"</em> or <em>"Plan a food-focused weekend in Montreal."</em>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
          ))}
          {loading && <div className="chat-msg assistant thinking">Thinking…</div>}
        </div>
      </div>
      <div className="chat-input-row">
        <textarea
          className="textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask a travel question… (Enter to send, Shift+Enter for new line)"
          rows={1}
        />
        <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  )
}

// ===================== FEEDBACK =====================

function FeedbackTab({ places, feedback, onAddFeedback }) {
  const [name, setName] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    onAddFeedback({
      id: uid(),
      name: name.trim(),
      placeId: placeId || null,
      message: message.trim(),
      createdAt: new Date().toISOString()
    })
    setName(''); setPlaceId(''); setMessage('')
  }

  const recent = [...feedback].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10)
  const placeName = (id) => places.find((p) => p.id === id)?.name

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={submit} className="card" style={{ padding: 22, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 14, fontSize: 18 }}>Share your thoughts</h3>
        <div className="form-group">
          <label className="form-label">Your name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">About a specific place? (optional)</label>
          <select className="select" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
            <option value="">General feedback</option>
            {places.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.city})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Your message</label>
          <textarea className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Send feedback</button>
      </form>

      <div>
        <div className="section-title">Recent feedback</div>
        {recent.length === 0 ? (
          <div className="muted" style={{ padding: '10px 0' }}>No feedback yet.</div>
        ) : (
          <div className="card" style={{ padding: '4px 18px' }}>
            {recent.map((f) => (
              <div key={f.id} className="comment">
                <div className="comment-head">
                  <div>
                    <span className="comment-author">{f.name}</span>
                    {f.placeId && placeName(f.placeId) && (
                      <span className="muted" style={{ marginLeft: 8, fontSize: 12 }}>· on {placeName(f.placeId)}</span>
                    )}
                  </div>
                  <span className="comment-date">{formatDate(f.createdAt)}</span>
                </div>
                <div className="comment-text">{f.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ===================== ADMIN =====================

function LocationSearch({ onPick }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!query.trim() || query.trim().length < 2) { setResults([]); return }
    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&addressdetails=1&q=${encodeURIComponent(query)}`
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
        const data = await res.json()
        setResults(data || [])
        setOpen(true)
      } catch (err) {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => timer.current && clearTimeout(timer.current)
  }, [query])

  const handlePick = (r) => {
    const addr = r.address || {}
    const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || addr.state || ''
    const country = addr.country || ''
    const name = r.display_name?.split(',')[0]?.trim() || ''
    onPick({
      name,
      lat: parseFloat(r.lat),
      lng: parseFloat(r.lon),
      address: r.display_name,
      city,
      country
    })
    setQuery(r.display_name)
    setOpen(false)
  }

  return (
    <div className="loc-search-wrap">
      <input
        className="input"
        value={query}
        placeholder="Search for a place name (e.g. 'Sushi Masuda Vancouver')…"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {loading && <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>Searching…</div>}
      {open && results.length > 0 && (
        <div className="loc-search-dropdown">
          {results.map((r, i) => (
            <div key={i} className="loc-search-item" onMouseDown={(e) => { e.preventDefault(); handlePick(r) }}>
              <div className="loc-search-item-name">{r.display_name.split(',')[0]}</div>
              <div className="loc-search-item-detail">{r.display_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PlaceEditor({ place, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    id: place?.id || uid(),
    name: place?.name || '',
    country: place?.country || '',
    city: place?.city || '',
    category: place?.category || 'restaurant-bar',
    rating: place?.rating || 5,
    tags: place?.tags || [],
    lat: place?.lat || null,
    lng: place?.lng || null,
    address: place?.address || '',
    comment: place?.comment || '',
    proTip: place?.proTip || '',
    photo: place?.photo || null
  }))

  // When category changes, drop invalid tags
  useEffect(() => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => TAG_META[t]?.categories.includes(f.category)) }))
  }, [form.category])

  const availableTags = useMemo(() => getTagsForCategory(form.category), [form.category])

  const handleLocationPick = (loc) => {
    setForm((f) => ({
      ...f,
      name: f.name || loc.name,
      lat: loc.lat,
      lng: loc.lng,
      address: loc.address,
      city: loc.city || f.city,
      country: loc.country || f.country
    }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  const toggleTag = (t) => setForm((f) => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t] }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim() || form.lat == null || form.lng == null) {
      alert('Please fill in name, review, and use Location Search to set coordinates.')
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="card" style={{ padding: 22 }}>
      <div className="admin-bar">
        <h3 style={{ fontSize: 20 }}>{place ? 'Edit place' : 'Add place'}</h3>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>

      <div className="form-group">
        <label className="form-label">Location Search · Type a place name, pick from results</label>
        <LocationSearch onPick={handleLocationPick} />
        {form.lat != null && form.lng != null && (
          <span className="coord-badge">✓ {form.lat.toFixed(4)}, {form.lng.toFixed(4)}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      </div>

      <div className="input-row">
        <div className="form-group">
          <label className="form-label">City</label>
          <input className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input className="input" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Address (auto-filled)</label>
        <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <div className="filter-row">
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button
              key={key}
              type="button"
              className={`pill ${form.category === key ? 'active' : ''}`}
              onClick={() => setForm({ ...form, category: key })}
            >{meta.icon} {meta.label}</button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Rating</label>
        <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
      </div>

      <div className="form-group">
        <label className="form-label">Tags</label>
        <div className="filter-row">
          {availableTags.map((t) => {
            const meta = TAG_META[t]
            const active = form.tags.includes(t)
            return (
              <button
                key={t}
                type="button"
                className={`pill tag-pill ${active ? 'active' : ''}`}
                style={active ? { '--tag-color': meta.color } : {}}
                onClick={() => toggleTag(t)}
              >{meta.label}</button>
            )
          })}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Review *</label>
        <textarea className="textarea" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
      </div>

      <div className="form-group">
        <label className="form-label">Pro Tip (optional)</label>
        <textarea className="textarea" value={form.proTip} onChange={(e) => setForm({ ...form, proTip: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-label">Photo (optional)</label>
        <input type="file" accept="image/*" onChange={handlePhoto} style={{ fontSize: 13 }} />
        {form.photo && (
          <div style={{ marginTop: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <img src={form.photo} alt="" style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8 }} />
            <button type="button" className="btn btn-ghost" onClick={() => setForm({ ...form, photo: null })}>Remove</button>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">{place ? 'Save changes' : 'Add place'}</button>
    </form>
  )
}

function StoryEditor({ story, places, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    id: story?.id || uid(),
    title: story?.title || '',
    country: story?.country || '',
    city: story?.city || '',
    coverPhoto: story?.coverPhoto || null,
    description: story?.description || '',
    memory: story?.memory || '',
    itinerary: story?.itinerary || null,
    gallery: story?.gallery || []
  }))

  const handleCoverPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, coverPhoto: reader.result }))
    reader.readAsDataURL(file)
  }

  // Itinerary actions
  const addItinerary = () => setForm(f => ({ ...f, itinerary: { title: '', tagline: '', days: [{ day: 1, title: '', notes: '' }] } }))
  const removeItinerary = () => { if (confirm('Remove the entire itinerary?')) setForm(f => ({ ...f, itinerary: null })) }
  const updateItinerary = (patch) => setForm(f => ({ ...f, itinerary: { ...f.itinerary, ...patch } }))
  const updateDay = (i, patch) => setForm(f => ({
    ...f,
    itinerary: { ...f.itinerary, days: f.itinerary.days.map((d, idx) => idx === i ? { ...d, ...patch } : d) }
  }))
  const addDay = () => setForm(f => {
    const nextNum = (f.itinerary.days[f.itinerary.days.length - 1]?.day || 0) + 1
    return { ...f, itinerary: { ...f.itinerary, days: [...f.itinerary.days, { day: nextNum, title: '', notes: '' }] } }
  })
  const removeDay = (i) => setForm(f => ({ ...f, itinerary: { ...f.itinerary, days: f.itinerary.days.filter((_, idx) => idx !== i) } }))

  // Gallery actions
  const addGalleryItem = () => setForm(f => ({ ...f, gallery: [...f.gallery, { id: uid(), photo: null, caption: '', placeId: '' }] }))
  const updateGalleryItem = (i, patch) => setForm(f => ({
    ...f,
    gallery: f.gallery.map((g, idx) => idx === i ? { ...g, ...patch } : g)
  }))
  const removeGalleryItem = (i) => setForm(f => ({ ...f, gallery: f.gallery.filter((_, idx) => idx !== i) }))
  const handleGalleryPhoto = (i, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateGalleryItem(i, { photo: reader.result })
    reader.readAsDataURL(file)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.country.trim()) {
      alert('Title and country are required.')
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="card" style={{ padding: 22 }}>
      <div className="admin-bar">
        <h3 style={{ fontSize: 20 }}>{story ? 'Edit chapter' : 'Add chapter'}</h3>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>

      <div className="form-group">
        <label className="form-label">Title (city or country) *</label>
        <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Tokyo, Lisbon, Iceland" required />
      </div>

      <div className="input-row">
        <div className="form-group">
          <label className="form-label">Country *</label>
          <input className="input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
        </div>
        <div className="form-group">
          <label className="form-label">City (optional)</label>
          <input className="input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Leave blank for country-level" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Cover photo (optional)</label>
        <input type="file" accept="image/*" onChange={handleCoverPhoto} style={{ fontSize: 13 }} />
        {form.coverPhoto && (
          <div style={{ marginTop: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <img src={form.coverPhoto} alt="" style={{ width: 200, height: 110, objectFit: 'cover', borderRadius: 8 }} />
            <button type="button" className="btn btn-ghost" onClick={() => setForm({ ...form, coverPhoto: null })}>Remove</button>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">📝 Description (optional) — what is this place?</label>
        <textarea className="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="A short overview of the city or country..." />
      </div>

      <div className="form-group">
        <label className="form-label">💭 My Memory (optional) — your travel or living stories</label>
        <textarea className="textarea" value={form.memory} onChange={e => setForm({ ...form, memory: e.target.value })} rows={5} placeholder="Personal stories, memorable moments, what made this place special..." />
      </div>

      <div className="editor-section">
        <div className="editor-section-header">
          <label className="form-label" style={{ marginBottom: 0 }}>🗓️ Itinerary (optional)</label>
          {form.itinerary ? (
            <button type="button" className="btn btn-ghost" onClick={removeItinerary}>Remove itinerary</button>
          ) : (
            <button type="button" className="btn btn-outline" onClick={addItinerary}>+ Add itinerary</button>
          )}
        </div>
        {form.itinerary && (
          <div className="editor-section-body">
            <div className="input-row">
              <div className="form-group">
                <label className="form-label">Itinerary title</label>
                <input className="input" value={form.itinerary.title} onChange={e => updateItinerary({ title: e.target.value })} placeholder="e.g. 7 Day Self-Drive" />
              </div>
              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input className="input" value={form.itinerary.tagline} onChange={e => updateItinerary({ tagline: e.target.value })} placeholder="One-line summary" />
              </div>
            </div>
            {form.itinerary.days.map((d, i) => (
              <div key={i} className="day-editor">
                <div className="day-editor-head">
                  <input
                    type="number"
                    className="input day-num-input"
                    value={d.day}
                    onChange={e => updateDay(i, { day: parseInt(e.target.value) || 1 })}
                  />
                  <input
                    className="input"
                    value={d.title}
                    onChange={e => updateDay(i, { title: e.target.value })}
                    placeholder="Day title (e.g. Arrive in Amman)"
                  />
                  <button type="button" className="btn btn-ghost" onClick={() => removeDay(i)}>×</button>
                </div>
                <textarea
                  className="textarea"
                  value={d.notes}
                  onChange={e => updateDay(i, { notes: e.target.value })}
                  placeholder="Day notes..."
                  rows={3}
                />
              </div>
            ))}
            <button type="button" className="btn btn-outline" onClick={addDay}>+ Add day</button>
          </div>
        )}
      </div>

      <div className="editor-section">
        <div className="editor-section-header">
          <label className="form-label" style={{ marginBottom: 0 }}>📸 Gallery (optional)</label>
          <button type="button" className="btn btn-outline" onClick={addGalleryItem}>+ Add photo</button>
        </div>
        {form.gallery.length > 0 && (
          <div className="editor-section-body">
            {form.gallery.map((g, i) => {
              const linkedPlace = g.placeId ? places.find(p => p.id === g.placeId) : null
              const previewSrc = g.photo || linkedPlace?.photo
              return (
                <div key={g.id || i} className="gallery-editor-row">
                  <div className="gallery-editor-thumb">
                    {previewSrc ? <img src={previewSrc} alt="" /> : <div className="gallery-editor-placeholder">📷</div>}
                  </div>
                  <div className="gallery-editor-fields">
                    <input type="file" accept="image/*" onChange={e => handleGalleryPhoto(i, e)} style={{ fontSize: 12, marginBottom: 8 }} />
                    <input className="input" value={g.caption} onChange={e => updateGalleryItem(i, { caption: e.target.value })} placeholder="Caption (optional)" style={{ marginBottom: 8 }} />
                    <select className="select" value={g.placeId} onChange={e => updateGalleryItem(i, { placeId: e.target.value })}>
                      <option value="">— Link to existing place (optional) —</option>
                      {places.map(p => <option key={p.id} value={p.id}>{p.name} ({p.city})</option>)}
                    </select>
                  </div>
                  <button type="button" className="btn btn-ghost" onClick={() => removeGalleryItem(i)}>×</button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">{story ? 'Save changes' : 'Add chapter'}</button>
    </form>
  )
}

function AdminTab({ places, stories, onSavePlace, onDeletePlace, onSaveStory, onDeleteStory, onExport }) {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [section, setSection] = useState('places') // places | chapters
  const [editingPlace, setEditingPlace] = useState(null)
  const [editingStory, setEditingStory] = useState(null)
  const [mode, setMode] = useState('list') // list | editor

  const tryLogin = (e) => {
    e?.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuth(true); setError('') } else setError('Incorrect password.')
  }

  if (!auth) {
    return (
      <div className="admin-gate">
        <h2>🔐 Admin</h2>
        <p>Password-protected area for managing your collection.</p>
        <form onSubmit={tryLogin}>
          <input
            type="password"
            className="input"
            value={pw}
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
          />
          <div><button className="btn btn-primary" type="submit">Unlock</button></div>
        </form>
        {error && <div style={{ color: '#B91C1C', fontSize: 13, marginTop: 10 }}>{error}</div>}
      </div>
    )
  }

  if (mode === 'editor' && section === 'places') {
    return (
      <PlaceEditor
        place={editingPlace}
        onSave={(data) => { onSavePlace(data); setMode('list'); setEditingPlace(null) }}
        onCancel={() => { setMode('list'); setEditingPlace(null) }}
      />
    )
  }

  if (mode === 'editor' && section === 'chapters') {
    return (
      <StoryEditor
        story={editingStory}
        places={places}
        onSave={(data) => { onSaveStory(data); setMode('list'); setEditingStory(null) }}
        onCancel={() => { setMode('list'); setEditingStory(null) }}
      />
    )
  }

  const sortedPlaces = [...places].sort((a, b) => a.name.localeCompare(b.name))
  const sortedStories = [...stories].sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div style={{ marginTop: 18 }}>
      <div className="toggle-group" style={{ marginBottom: 18 }}>
        <button className={section === 'places' ? 'active' : ''} onClick={() => setSection('places')}>📍 Places ({places.length})</button>
        <button className={section === 'chapters' ? 'active' : ''} onClick={() => setSection('chapters')}>📖 Chapters ({stories.length})</button>
      </div>

      {section === 'places' && (
        <>
          <div className="admin-bar">
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 2 }}>Manage places</h3>
              <div className="muted">{places.length} total · localStorage persistence</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={onExport}>Export JSON</button>
              <button className="btn btn-primary" onClick={() => { setEditingPlace(null); setMode('editor') }}>+ Add place</button>
            </div>
          </div>
          {sortedPlaces.map((p) => (
            <div key={p.id} className="admin-list-item">
              <div className="admin-list-item-info">
                <div className="admin-list-item-name">{CATEGORY_META[p.category]?.icon} {p.name}</div>
                <div className="admin-list-item-meta">{p.city}, {p.country} · {'★'.repeat(p.rating || 0)}</div>
              </div>
              <div className="admin-list-item-actions">
                <button className="btn btn-ghost" onClick={() => { setEditingPlace(p); setMode('editor') }}>Edit</button>
                <button className="btn btn-danger" onClick={() => { if (confirm(`Delete "${p.name}"?`)) onDeletePlace(p.id) }}>Delete</button>
              </div>
            </div>
          ))}
        </>
      )}

      {section === 'chapters' && (
        <>
          <div className="admin-bar">
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 2 }}>Manage chapters</h3>
              <div className="muted">{stories.length} total · stories, descriptions, itineraries, photos</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={() => { setEditingStory(null); setMode('editor') }}>+ Add chapter</button>
            </div>
          </div>
          {sortedStories.map((s) => {
            const hasMemory = !!s.memory?.trim()
            const hasDesc = !!s.description?.trim()
            const hasIt = !!s.itinerary?.days?.length
            const hasGallery = !!s.gallery?.length
            return (
              <div key={s.id} className="admin-list-item">
                <div className="admin-list-item-info">
                  <div className="admin-list-item-name">📖 {s.title}</div>
                  <div className="admin-list-item-meta">
                    {s.country}{s.city && s.city !== s.title ? ` · ${s.city}` : ''} ·
                    {hasDesc ? ' 📝' : ''}{hasMemory ? ' 💭' : ''}{hasIt ? ` 🗓️${s.itinerary.days.length}d` : ''}{hasGallery ? ` 📸${s.gallery.length}` : ''}
                    {!hasDesc && !hasMemory && !hasIt && !hasGallery && ' (empty)'}
                  </div>
                </div>
                <div className="admin-list-item-actions">
                  <button className="btn btn-ghost" onClick={() => { setEditingStory(s); setMode('editor') }}>Edit</button>
                  <button className="btn btn-danger" onClick={() => { if (confirm(`Delete chapter "${s.title}"?`)) onDeleteStory(s.id) }}>Delete</button>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

// ===================== MAIN APP =====================

export default function App() {
  const initial = useMemo(() => loadData(), [])
  const [places, setPlaces] = useState(initial.places)
  const [stories, setStories] = useState(initial.stories)
  const [comments, setComments] = useState(initial.comments || [])
  const [feedback, setFeedback] = useState(initial.feedback || [])

  const [activeTab, setActiveTab] = useState('explore')
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)
  const [selectedStoryId, setSelectedStoryId] = useState(null)
  const [toast, setToast] = useState('')

  // Persist to localStorage
  useEffect(() => {
    saveData({ places, stories, comments, feedback })
  }, [places, stories, comments, feedback])

  // Inject styles once
  useEffect(() => {
    const id = 'wanderlaine-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = STYLES_CSS
    document.head.appendChild(style)
  }, [])

  // When switching tab, clear any detail view
  useEffect(() => {
    setSelectedPlaceId(null)
    setSelectedStoryId(null)
  }, [activeTab])

  const selectedPlace = places.find((p) => p.id === selectedPlaceId)
  const selectedStory = stories.find((s) => s.id === selectedStoryId)

  const handleAddComment = (c) => { setComments((cs) => [...cs, c]); setToast('Comment posted ✨') }
  const handleAddFeedback = (f) => { setFeedback((fs) => [...fs, f]); setToast('Thanks for the feedback! 💌') }

  const handleSavePlace = (data) => {
    setPlaces((ps) => {
      const exists = ps.find((p) => p.id === data.id)
      if (exists) return ps.map((p) => (p.id === data.id ? data : p))
      return [...ps, data]
    })
    setToast('Saved')
  }

  const handleDeletePlace = (id) => {
    setPlaces((ps) => ps.filter((p) => p.id !== id))
    setComments((cs) => cs.filter((c) => c.placeId !== id))
    setToast('Deleted')
  }

  const handleSaveStory = (data) => {
    setStories((ss) => {
      const exists = ss.find((s) => s.id === data.id)
      if (exists) return ss.map((s) => (s.id === data.id ? data : s))
      return [...ss, data]
    })
    setToast('Saved')
  }

  const handleDeleteStory = (id) => {
    setStories((ss) => ss.filter((s) => s.id !== id))
    setToast('Deleted')
  }

  // Cross-tab navigation: open a place from anywhere (e.g. a gallery item in a chapter)
  const openPlaceFromAnywhere = (placeId) => {
    setActiveTab('explore')
    // Set placeId after tab-switch effect resets it
    setTimeout(() => setSelectedPlaceId(placeId), 0)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ places, stories }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wanderlaine-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Header places={places} />
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app" style={{ paddingTop: 20 }}>
        {activeTab === 'explore' && (
          selectedPlace ? (
            <PlaceDetail
              place={selectedPlace}
              comments={comments}
              onBack={() => setSelectedPlaceId(null)}
              onAddComment={handleAddComment}
            />
          ) : (
            <ExploreTab places={places} onSelectPlace={setSelectedPlaceId} />
          )
        )}

        {activeTab === 'chapters' && (
          selectedStory ? (
            <StoryDetail
              story={selectedStory}
              places={places}
              onBack={() => setSelectedStoryId(null)}
              onOpenPlace={openPlaceFromAnywhere}
            />
          ) : (
            <StoriesTab stories={stories} onSelect={setSelectedStoryId} />
          )
        )}

        {activeTab === 'ask' && <AskAITab places={places} stories={stories} />}

        {activeTab === 'feedback' && (
          <FeedbackTab places={places} feedback={feedback} onAddFeedback={handleAddFeedback} />
        )}

        {activeTab === 'admin' && (
          <AdminTab
            places={places}
            stories={stories}
            onSavePlace={handleSavePlace}
            onDeletePlace={handleDeletePlace}
            onSaveStory={handleSaveStory}
            onDeleteStory={handleDeleteStory}
            onExport={handleExport}
          />
        )}
      </div>
      <Toast message={toast} onClose={() => setToast('')} />
    </>
  )
}
