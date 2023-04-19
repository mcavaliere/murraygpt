import Image from "next/image";
import { Inter } from "next/font/google";
import { startTransition, useState, useEffect } from "react";
import fs from "fs";
import path from "path";

import { QuoteCard } from "@/components/QuoteCard";
import { randomNumberBetween } from "@/lib/utils/randomNumberBetween";
import { fetchRandomQuote } from "@/lib/api";

const inter = Inter({ subsets: ["latin"] });

export type HomeProps = {
  images: string[];
};

export default function Home({ images }: HomeProps) {
  const [murrayism, setMurrayism] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {}, []);

  async function handleClick(e: any) {
    e.preventDefault();

    setLoading(true);

    startTransition(() => {
      try {
        fetchRandomQuote().then(({ quote }) => {
          // Pick a random Bill Murray photo from those in our public/images/billmurray folder.
          const index = randomNumberBetween(0, images.length - 1);
          setAvatarSrc(`/images/billmurray/${images[index]}`);
          setMurrayism(quote);
          setLoading(false);
        });
      } catch (error) {
        console.warn("error: ", error);
        setLoading(false);
      }
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <h1 className="font-bold text-2xl">MurrayGPT</h1>
        </div>

        <div className="fixed right-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:p-4 gap-4">
          <Image
            src="/images/icons/loader.svg"
            width={28}
            height={28}
            alt="Loading spinner animation"
            className={`${loading ? "block" : "hidden"}`}
          />
          <button
            type="button"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
            disabled={loading}
          >
            Get me a new Murrayism!
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center place-items-center after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] w-full h-80">
        {loading ? (
          <h2>Loading...</h2>
        ) : murrayism ? (
          <QuoteCard
            quote={murrayism}
            author="Bill Murray"
            avatarSrc={avatarSrc as string}
          />
        ) : null}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex ">
        <div className="mb-32 ">
          <div className="flex place-items-center gap-2 lg:pointer-events-auto d-block">
            By <a href="https://mikecavaliere.com">Mike Cavaliere</a> @
            <a
              className="bg-slate-900 p-4 rounded-xl"
              href="https://echobind.com"
              target="_blank"
            >
              <Image
                src="eb-logo.svg"
                alt="Echobind Logo"
                width={100}
                height={100}
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  // Get the list of images in the public/images/billmurray folder, filter out hidden files.
  const imagesDir = path.join(process.cwd(), "public", "images", "billmurray");
  const images = fs
    .readdirSync(imagesDir)
    .filter((name) => !name.startsWith("."));

  return {
    props: {
      images,
    },
  };
}
