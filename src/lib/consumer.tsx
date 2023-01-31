import React, { useContext } from 'react';
import { ZokshContext } from './sdk-react';

export const Consumer = () => {
  const zoksh = useContext(ZokshContext);

  return (
    <>
      <p>{`Current status: ${zoksh.status}`}</p>
      {zoksh.status === 'ready' && <p>You can use the script here.</p>}
    </>
  );
};
