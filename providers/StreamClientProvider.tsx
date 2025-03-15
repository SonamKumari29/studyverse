'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log('isLoaded:', isLoaded, 'user:', user);

    if (!isLoaded) return; // Wait until the user is loaded

    if (!user || typeof user.id === 'undefined' || user.id === null) {
      setError('Error: User is undefined or null');
      return;
    }

    if (!API_KEY) {
      const apiKeyError = 'Error: Stream API key is missing';
      console.error(apiKeyError);
      setError(apiKeyError);
      return;
    }

    try {
      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        tokenProvider,
      });
      console.log('StreamVideoClient initialized:', client);
      setVideoClient(client);
    } catch (e) {
      const clientInitError = 'Error initializing StreamVideoClient';
      console.error(clientInitError, e);
      setError(clientInitError);
    }
  }, [user, isLoaded]);

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;
  }

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
