import { FormEvent, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import FormError from '@/components/errors/formError/formError';

const Checkout = ({ price, currency }: { price: number; currency: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
      }
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setError(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <div className="flex flex-col bg-secondary py-2 px-4 rounded-lg">
        <span>${price}/month - Standard subscription</span>
      </div>
      <p className="text-xs text-secondary-foreground">
        By clicking the &apos;Start Paid Membership&apos; button below, you
        agree to our terms of use and that you are over 18 and acknowledge the
        Privacy Statement. Fitly will automatically continue your membership and
        charge the membership fee (currently ${price}/month) to your payment
        method until you cancel. You may cancel at any time to avoid any future
        charges
      </p>
      <Button type="submit" disabled={!stripe} className="text-white" size="lg">
        Start Paid Membership
      </Button>
      <FormError error={error} />
    </form>
  );
};

export default Checkout;
