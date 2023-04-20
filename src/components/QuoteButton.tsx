import { MouseEventHandler } from "react";
import Image from "next/image";

export type QuoteButtonProps = {
  loading?: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  size?: "xl" | "lg" | "md" | "sm";
};

export function QuoteButton({
  loading = false,
  handleClick,
  size = "sm",
}: QuoteButtonProps) {
  const padding = size === "xl" ? "py-4 px-6" : "px-3 py-2";

  return (
    <>
      <Image
        src="/images/icons/loader.svg"
        width={28}
        height={28}
        alt="Loading spinner animation"
        className={`${loading ? "visible" : "invisible"} `}
      />
      <button
        type="button"
        className={`flex justify-center rounded-md bg-indigo-600 ${padding} text-${size} font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={handleClick}
        disabled={loading}
      >
        Generate new quote
      </button>
    </>
  );
}
