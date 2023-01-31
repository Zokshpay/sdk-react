# sdk-react

React wrapper on latest zoksh embed.js for easy, secure and up-to-date integration.

## Usage example

```js
import { useZoksh } from './useZoksh';

export const Example = () => {
  const { status, addEventHandler, initOrder } = useZoksh({
    environment: 'test',
  });

  const initHandler = useCallback(() => {
    console.log('payment init');
  }, [status]);

  const validatedHandler = useCallback(() => {
    console.log('payment validated');
  }, [status]);

  useEffect(() => {
    if (status === 'ready') {
      addEventHandler({ event: 'payment-init', handler: initHandler });
      addEventHandler({ event: 'payment-validated', handler: validatedHandler });

      initOrder('821uosadfnq230aa822nc');
    }
  }, [status, addEventHandler]);

  return (
    <>
      <p>{`Current status: ${status}`}</p>
      {status === 'ready' && <p>You can use the script here.</p>}
    </>
  );
};
```
