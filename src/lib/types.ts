export type ZokshPayEmbedType = 'headless';

export interface ThemeOptions {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
}

export interface WalletConfig {
  address: string;
  memo?: string;
}

export interface RampConfig {
  order?: string;
  wallets?: Record<string, WalletConfig>;
  networks?: string[];
  cryptos?: string[];
}

export interface ZokshPayConfig {
  id?: string; // unique identifier
  /*
   */
  environment?: 'test' | 'local' | 'prod' | 'stage' | 'sandbox';
  /*
  Label to show on the button in button mode
  */
  label?: string;

  /*
  API KEY of the client
  */
  apiKey?: string;

  /*
  Payment amount
  */
  amount?: string;

  /*
  Order ID record passed from client side, generated via signed api call on server
  */
  order?: string;

  /*
  SHA signature required in case product payment and change in product attributes as defined on Moopay dashboard
  */
  signature?: string;

  /*
  button: renders a button, which opens the popup for payment
  inset: renders the payment form directly, used in payment pages.
  headless: doesn't render any UI, merchant has to explicitly call init with mergable options
  */
  mode?: ZokshPayEmbedType;

  params?: Record<string, string>;

  // showNotifications?: boolean;
}

export type ZokshPayEvent =
  | 'cancelled'
  // | 'expiry-timer'
  // | 'callback-urls'
  // | 'clear-expiry'
  // | 'expired-session'
  | 'payment-init'
  | 'transaction-requested'
  | 'transaction-completed'
  | 'payment-processed'
  | 'payment-validated'
  | 'payment-failed'
  | 'payment-cancelled'
  | 'modal-opened'
  | 'modal-closed';
// | 'redirect';

export interface ZokshPayEventHandler {
  event: ZokshPayEvent;
  handler: (event: any) => any;
}

export interface ZokshSDKProps {
  configurations: ZokshPayConfig;
  eventHandlers: ZokshPayEventHandler[];
  children?: React.ReactElement;
}
