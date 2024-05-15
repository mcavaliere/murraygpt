import Image from "next/image";
import Link from "next/link";
import { startTransition, useReducer, useState } from "react";
import fs from "fs";
import path from "path";
import { Transition } from "@headlessui/react";

import { QuoteCard } from "@/components/QuoteCard";
import { randomNumberBetween } from "@/lib/utils/randomNumberBetween";
import { fetchRandomQuote } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { QuoteButton } from "@/components/QuoteButton";
import { FaGithub } from "react-icons/fa";

export type HomeProps = {
  images: string[];
};

export const INITIAL_STATE = {
  messages: [],
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case "APPEND_MESSAGES": {
      return {
        messages: [...state.messages, ...action.messages],
      };
    }

    default:
      return state;
  }
}

export default function Home({ images }: HomeProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  async function handleClick(e: any) {
    e.preventDefault();

    setLoading(true);

    startTransition(() => {
      fetchRandomQuote(state.messages)
        .then(({ quote }) => {
          // Pick a random Bill Murray photo from those in our public/images/billmurray folder.
          const index = randomNumberBetween(0, images.length - 1);

          setAvatarSrc(`/images/billmurray/${images[index]}`);
          dispatch({ type: "APPEND_MESSAGES", messages: [quote] });
          setLoading(false);
        })
        .catch((error) => {
          setError({
            title: "Ouch. ",
            message: "I got a boo-boo. 😭 Try again later. ",
          });
          console.warn("error: ", error);
          setLoading(false);
        });
    });
  }

  const quote = state.messages.length
    ? state.messages.slice(-1)[0].content
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <header className="z-10 w-full max-w-5xl items-center justify-between text-sm relative">
        <div className=" flex flex-col w-full items-center font-mono dark:from-inherit lg:static lg:w-auto gap-4">
          <h1 className="font-bold text-2xl">MurrayGPT</h1>
          <h2>The best Bill Murray quotes an AI could write.</h2>
        </div>

        <div className="absolute right-0 top-0">
          <Link href="https://github.com/mcavaliere/murraygpt" target="_blank">
            <FaGithub size={30} />
          </Link>
        </div>
      </header>

      <div className="relative flex flex-col justify-between items-center place-items-center w-full h-80 gap-10 max-w-2xl ">
        <Transition
          appear={true}
          show={!loading}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="w-full"
        >
          {error && (
            <ErrorAlert
              title={error.title}
              message={error.message}
              onCloseClick={() => setError(null)}
            />
          )}
          {quote && (
            <QuoteCard
              quote={quote}
              author="Bill Murray"
              avatarSrc={avatarSrc as string}
            />
          )}
        </Transition>
        <div
          className={`${
            quote ? "-bottom-28" : "bottom-32"
          } gap-4 flex-row absolute justify-self-end sm:flex -top-50
          transition-[bottom] ease-in-out duration-500
          `}
        >
          <QuoteButton loading={loading} handleClick={handleClick} size="lg" />
        </div>
      </div>

      <footer className="z-10 w-full gap-10 flex-col-reverse  max-w-5xl items-center justify-end font-mono text-sm flex md:flex-row md:justify-end ">
        <div className="flex place-items-center gap-2 lg:pointer-events-auto d-block">
          Created by{" "}
          <a href="https://mikecavaliere.com" className="font-bold">
            Mike Cavaliere
          </a>
        </div>
      </footer>
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
