import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export type QuoteCardProps = {
  quote: string;
  author: string;
  avatarSrc: string;
};

export function QuoteCard({ quote, author, avatarSrc }: QuoteCardProps) {
  return (
    <Card className="animate-in fade-in">
      <CardHeader>
        <Avatar className="w-20 h-20 rounded-full aspect-auto relative -mt-16 mx-auto shadow-lg">
          <AvatarImage src={avatarSrc} alt="Photo of Bill Murray" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="w-full mb-10">
          <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
            “
          </div>
          <p className="text-sm text-gray-600 text-center px-5">{quote}</p>
          <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">
            ”
          </div>
        </div>
        <div className="w-full">
          <p className="text-md text-indigo-500 font-bold text-center">
            {author}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
