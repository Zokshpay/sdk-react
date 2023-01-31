import useScript from './useScript';
import React, { useEffect, useState } from 'react';
import { ZokshSDKProps, ZokshPayEventHandler, ZokshPayConfig } from './types';

declare const Zoksh: any;

export function useZoksh({ configurations, eventHandlers }: ZokshSDKProps) {
  const status = useScript(`https://pay.testnet.zoksh.com/public/embed.js`, { removeOnUnmount: false });
  const [contextValue, setContextValue] = useState<any>();

  useEffect(() => {
    if (typeof Zoksh !== 'undefined') {
      try {
        const instance = new Zoksh({
          ...configurations,
        });

        eventHandlers.forEach((event: ZokshPayEventHandler) => {
          try {
            instance.subscribe(event.event, event.handler);
          } catch (e) {
            console.log(e);
          }
        });

        instance.init();

        setContextValue(instance);
      } catch (e) {
        console.log(e);
      }
    }
  }, [status]);

  return { status, contextValue };
}

// environment?: 'test' | 'local' | 'prod' | 'stage' | 'sandbox';
function zokshURL(environment: ZokshPayConfig['environment']) {
  switch (environment) {
    case 'local':
      return 'https://pay.moopay.local';
    case 'prod':
      return 'https://pay.zoksh.com';
    case 'test':
    case 'stage':
    case 'sandbox':
      return 'https://pay.testnet.zoksh.com';
    default:
      return 'https://pay.testnet.zoksh.com';
  }
}
