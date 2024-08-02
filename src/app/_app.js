// src/app/_app.js
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/queryClient';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
