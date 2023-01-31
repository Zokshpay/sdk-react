import React from 'react';
import { createRoot } from 'react-dom/client';
import Zoksh from './lib/sdk-react';

const App = () => {
  return (
    <Zoksh
      configurations={{
        order: 'orderId',
        mode: 'headless',
        environment: 'test', // test , prod
      }}
      eventHandlers={[
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
      ]}
    />
  );
};

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(<App />);
