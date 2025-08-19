import React, { useEffect } from 'react';
import { Navigation } from './src/navigation';
import { useStore } from './src/store';

export default function App() {
  const initialize = useStore(state => state.initialize);
  const isInitialized = useStore(state => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
    initialize();
    }
  }, [isInitialized]);

  return <Navigation />;
}
