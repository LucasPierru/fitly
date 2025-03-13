import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export const metadata = {
  title: 'Fitly | Home'
};

export default async function Index() {
  return (
    <div className="relative grow w-full flex flex-col gap-20 items-center">
      <div className="block fixed w-screen lg:-mr-5 h-full z-[-1]">
        <div className="block overflow-hidden bg-none absolute top-0 w-full h-full aspect-video">
          <Image
            src="/hero.jpg"
            alt="hero"
            fill
            className="block absolute inset-0 object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      <div className="flex flex-col bg-transparent min-h-[var(--page-size)] max-w-7xl mx-auto justify-start lg:justify-center lg:items-start items-center text-white gap-8 lg:gap-4 lg:p-8 px-4 py-12">
        <span className="text-4xl text-white text-center lg:text-left font-semibold leading-none bottom-0">
          Get to a healthier and more active life with Fitly
        </span>
        <div className="flex flex-col w-full">
          <span className="text-3xl font-bold text-center lg:text-left">
            What you get
          </span>
          <span className="text-lg text-center lg:text-left">
            Fitly is your guide to health and fitness. <br />
            Create personalized meals and meal plans and never have to worry
            about the hassle of logging your food ever again
          </span>
        </div>
        <Link
          href="/signup"
          className="bg-primary px-4 py-3 text-lg rounded-lg text-white hover:bg-primary/90 transition-all ease-in duration-200"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
