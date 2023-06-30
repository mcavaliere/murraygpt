import { MouseEventHandler } from "react";
import Image from "next/image";
import { Button, ButtonProps } from "@/components/ui";

export type QuoteButtonProps = {
  loading?: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonProps;

export function QuoteButton({
  loading = false,
  handleClick,
  size
}: QuoteButtonProps) {

  return (
    <div
      className="flex flex-col align-center relative"
      data-component-name="QuoteButton"
    >
      <Button
        size={size}
        className={`flex relative justify-center  shadow-sm hover:opacity-80`}
        onClick={handleClick}
        disabled={loading}
      >
        Generate new quote
      </Button>
      <div className="flex justify-center align-center flex-row w-full absolute -bottom-10">
        <Image
          src="/images/icons/loader.svg"
          width={30}
          height={30}
          alt="Loading spinner animation"
          className={` ${loading ? "visible" : "invisible"}`}
        />
      </div>
    </div>
  );
}
