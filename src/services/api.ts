"use client";

export interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

// Persistent mock database using localStorage for demo
const getStoredLinks = (): ShortenedURL[] => {
  const stored = localStorage.getItem('ziplink_mock_db');
  return stored ? JSON.parse(stored) : [];
};

const saveLinks = (links: ShortenedURL[]) => {
  localStorage.setItem('ziplink_mock_db', JSON.stringify(links));
};

export const shortenUrl = async (url: string): Promise<ShortenedURL> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Basic validation
  if (!url.startsWith('http')) {
    throw new Error('Please enter a valid URL starting with http:// or https://');
  }

  const shortCode = Math.random().toString(36).substring(2, 8);
  const links = getStoredLinks();
  
  const newLink: ShortenedURL = {
    id: Date.now().toString(),
    originalUrl: url,
    shortCode,
    clicks: 0,
    createdAt: new Date().toISOString(),
  };

  links.unshift(newLink);
  saveLinks(links);
  return newLink;
};

export const getUrlByCode = async (code: string): Promise<ShortenedURL | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const links = getStoredLinks();
  const linkIndex = links.findIndex(l => l.shortCode === code);
  
  if (linkIndex !== -1) {
    links[linkIndex].clicks += 1; // Increment clicks
    saveLinks(links);
    return { ...links[linkIndex] };
  }
  
  return null;
};