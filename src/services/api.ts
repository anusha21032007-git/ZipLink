"use client";

export interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

// Mock database in memory for demo
const mockLinks: ShortenedURL[] = [];

export const shortenUrl = async (url: string): Promise<ShortenedURL> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Basic validation
  if (!url.startsWith('http')) {
    throw new Error('Please enter a valid URL starting with http:// or https://');
  }

  const shortCode = Math.random().toString(36).substring(2, 8);
  const newLink: ShortenedURL = {
    id: Date.now().toString(),
    originalUrl: url,
    shortCode,
    clicks: Math.floor(Math.random() * 10),
    createdAt: new Date().toISOString(),
  };

  mockLinks.unshift(newLink);
  return newLink;
};