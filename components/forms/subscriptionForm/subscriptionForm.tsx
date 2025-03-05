'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useTheme } from 'next-themes';
import Checkout from './checkout';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SubscriptionForm = ({
  clientSecret,
  price,
  currency
}: {
  clientSecret: string;
  price: number;
  currency: string;
}) => {
  const { theme } = useTheme();
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === 'dark' ? 'night' : 'stripe'
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout price={price} currency={currency} />
    </Elements>
  );
};

export default SubscriptionForm;
