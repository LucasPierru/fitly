import Image from 'next/image';

export const metadata = {
  title: 'Fitly | Home'
};

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center py-8">
      <div className="relative max-w-7xl w-full aspect-video">
        <Image
          src="/hero.jpg"
          alt="hero"
          fill
          className="absolute object-cover rounded-xl m-auto"
        />
        <span className="absolute text-4xl text-center p-10 font-bold bottom-0">
          Get to a healthier and more active life with the new HealthTrack app
        </span>
      </div>
      <div className="flex flex-col relative max-w-7xl w-full">
        <span className="text-3xl font-bold">What you get</span>
        <span className="text-base">
          HealthTrack is your guide to health and fitness. Your personalized
          12-week workout plan, meal plan, sleep program, and more are all
          included.
        </span>
      </div>
    </div>
  );
}
