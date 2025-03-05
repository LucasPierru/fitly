import SubscriptionForm from '@/components/forms/subscriptionForm/subscriptionForm';

export const metadata = {
  title: 'Fitly | Subscribe'
};

export default function SubscribePage({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full justify-center gap-2">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl text-bold text-center lg:text-left mb-2">
          Setup your credit or debit card and start your 7-day free trial
        </h1>
        <SubscriptionForm
          clientSecret="pi_3QzNb1RspX9AHcm10jykd56i_secret_5plWD3qBMzIR1pUWR9f7L4tgW"
          price={5}
          currency="cad"
        />
      </div>
    </div>
  );
}
