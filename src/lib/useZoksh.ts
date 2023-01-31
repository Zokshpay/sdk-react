import useScript from './useScript';
import { useCallback, useState } from 'react';
import { ZokshPayEventHandler, ZokshPayConfig } from './types';

declare const Zoksh: any;

export function useZoksh(configuration: ZokshPayConfig) {
  const status = useScript(zokshURL(configuration.environment), { removeOnUnmount: false });
  const [eventHandlers, setEventHandlers] = useState<any>({});

  const initOrder = useCallback(
    (orderId: string) => {
      if (status === 'ready' && typeof Zoksh !== 'undefined') {
        const instance = new Zoksh({
          ...configuration,
          mode: 'headless',
          orderId,
        });

        eventHandlers.forEach((event: ZokshPayEventHandler) => {
          try {
            instance.subscribe(event.event, event.handler);
          } catch (e) {
            console.log(e);
          }
        });

        instance.init();

        return instance;
      }
    },
    [status]
  );

  const addEventHandler = useCallback(({ event, handler }: ZokshPayEventHandler) => {
    setEventHandlers({ ...eventHandlers, [event]: { event, handler } });
  }, []);

  return { status, addEventHandler, initOrder };
}

function zokshURL(environment: ZokshPayConfig['environment'] = 'test') {
  switch (environment) {
    case 'prod':
      return 'https://pay.zoksh.com/public/embed.js';
    case 'test':
    case 'stage':
    case 'sandbox':
    case 'local':
    default:
      return `https://pay.testnet.zoksh.com/public/embed.js`;
  }
}
