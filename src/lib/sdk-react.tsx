import { useScript } from 'usehooks-ts';
import { useEffect, useState } from 'react';

import { ZokshSDKProps } from './types';
import React from 'react';
import { ZokshPayEventHandler } from '../types';

export const ZokshContext = React.createContext<any>({});

declare const Zoksh: any;

export function ZokshSdk({ configurations, eventHandlers }: ZokshSDKProps) {
  const status = useScript(`https://pay.testnet.zoksh.com/public/embed.js`, { removeOnUnmount: false });
  const [contextValue, setContextValue] = useState<any>();

  useEffect(() => {
    if (typeof Zoksh !== 'undefined') {
      try {
        const mp = new Zoksh({
          ...configurations,
        });

        eventHandlers.forEach((event: ZokshPayEventHandler) => {
          try {
            mp.subscribe(event.event, event.handler);
          } catch (e) {
            console.log(e);
          }
        });

        mp.init();
        setContextValue(mp);
      } catch (e) {
        console.log(e);
      }
    }
  }, [status]);

  return <></>;
}

export default ZokshSdk;
