import React from 'react';
import { createRoot } from 'react-dom/client';
import { useZoksh } from './useZoksh';

const App = () => {
  const { status, contextValue } = useZoksh({
    configurations: {
      order: 'orderId',
      mode: 'headless',
      environment: 'test', // test , prod
    },
    eventHandlers: [
      {
        event: 'payment-init',
        handler: (ev) => {
          console.log('Got payment init');
          console.log(ev);
        },
      },
      {
        event: 'payment-validated',
        handler: (ev) => {
          console.log('Got payment validated');
          console.log(ev);
        },
      },
      {
        event: 'payment-failed',
        handler: (ev) => {
          console.log('Got failed');
          console.log(ev);
        },
      },
      {
        event: 'payment-processed',
        handler: (ev) => {
          console.log('Got processed');
          console.log(ev);
        },
      },
    ],
  });

  return (
    <>
      <p>{`Current status: ${status}`}</p>
      {status === 'ready' && <p>You can use the script here.</p>}
    </>
  );
};

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(<App />);