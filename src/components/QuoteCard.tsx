import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type QuoteCardProps = {
  quote: string;
  author: string;
  avatarSrc: string;
};

export function QuoteCard({ quote, author, avatarSrc }: QuoteCardProps) {
  return (
    <Card className="animate-in fade-in">
  <CardHeader>
  <div className="w-full pt-1 pb-5">
           <div className="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg relative">
             <Image
               src={avatarSrc}
               alt="Photo of Bill Murray"
               className="rounded-full "
               fill={true}
             />
           </div>
         </div>
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
