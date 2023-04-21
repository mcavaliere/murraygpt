import Image from "next/image";
import Link from "next/link";
import { startTransition, useReducer, useState, useEffect } from "react";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex ">
        <div className=" flex w-full justify-center font-mono dark:from-inherit lg:static lg:w-auto ">
          <h1 className="font-bold text-2xl">MurrayGPT</h1>
        </div>

        <div className="row hidden lg:flex gap-4">
          {quote && <QuoteButton loading={loading} handleClick={handleClick} />}
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-center place-items-center w-full h-80 gap-10 max-w-2xl">
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
          className={` gap-4 flex-row relative -left-5 ${
            quote ? " sm:flex lg:hidden" : "flex"
          }`}
        >
          <QuoteButton
            loading={loading}
            handleClick={handleClick}
            size={quote ? "sm" : "xl"}
          />
        </div>
      </div>
      <div className="z-10 w-full gap-10 flex-col-reverse  max-w-5xl items-center justify-end font-mono text-sm flex md:flex-row md:justify-between ">
        <div className="flex">
          <Link href="https://github.com/mcavaliere/murraygpt" target="_blank">
            <FaGithub size={50} />
          </Link>
        </div>
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
