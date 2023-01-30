import { useScript } from 'usehooks-ts';
import { useEffect } from 'react';

import { ZokshSDKProps } from './types';
import React from 'react';

declare const ZokshGlobal: any;

export function Zoksh(props: ZokshSDKProps) {
  const status = useScript(`https://pay.testnet.zoksh.com/public/embed.js`, { removeOnUnmount: false });

  useEffect(() => {
    if (typeof ZokshGlobal !== 'undefined') {
      console.log(ZokshGlobal);
    }
  }, [status]);

  return (
    <div>
      <p>{`Current status: ${status}`}</p>
      {status === 'ready' && <p>You can use the script here.</p>}
    </div>
  );
}

export default Zoksh;
