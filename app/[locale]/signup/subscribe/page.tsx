import SubscriptionForm from '@/components/forms/subscriptionForm/subscriptionForm';
import { createSubscription } from '@/requests/subscription';

export const metadata = {
  title: 'Fitly | Subscribe'
};

export default async function SubscribePage({
  searchParams
}: {
  searchParams: { message: string };
}) {
  const { subscriptionCurrency, subscriptionPrice, clientSecret } =
    await createSubscription();

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full justify-center gap-2">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl text-bold text-center lg:text-left mb-2">
          Setup your credit or debit card and start your 7-day free trial
        </h1>
        <SubscriptionForm
          clientSecret={clientSecret}
          price={subscriptionPrice / 100}
          currency={subscriptionCurrency}
        />
      </div>
    </div>
  );
}
