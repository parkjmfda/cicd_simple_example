'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/myapi';

export default function HomePage() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: { message?: string } = await response.json();
        if (typeof data.message === 'string') {
          setMessage(data.message);
          return;
        }
        setError('Unexpected response from the backend.');
      } catch (err) {
        console.error('Failed to fetch greeting from backend', err);
        setError('Unable to load data from the backend.');
      }
    }

    fetchMessage();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <h1 className="text-4xl font-semibold text-gray-900">
        {message || error || 'Loading...'}
      </h1>
    </main>
  );
}
