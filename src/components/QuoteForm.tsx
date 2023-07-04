"use client";

import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

export type Tone =
  | "Whimsical"
  | "Philosophical"
  | "Optimistic"
  | "Romantic"
  | "Surreal";
export type Topic =
  | "Humor"
  | "Living in the present"
  | "Joy and happiness"
  | "Human connections"
  | "The power of love";

export type RealOrGenerated = "real" | "generated";

const formSchema = z.object({});

export function QuoteForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      tone: "",
      real_or_generated: "generated"
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit: ", values);
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-blue-600">Customize</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[200px]">
        <SheetHeader>
          <SheetTitle className="text-center mb-4">
            Generator Options
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <div className="flex flex-row w-full md:w-1/2 justify-center md:justify-end">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Humor">Humor</SelectItem>
                          <SelectItem value="Living in the present">
                            Living in the present
                          </SelectItem>
                          <SelectItem value="Joy and happiness">
                            Joy and happiness
                          </SelectItem>
                          <SelectItem value="Human connections">
                            Human connections
                          </SelectItem>
                          <SelectItem value="The power of love">
                            The power of love
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Whimsical">Whimsical</SelectItem>
                          <SelectItem value="Philosophical">
                            Philosophical
                          </SelectItem>
                          <SelectItem value="Optimistic">Optimistic</SelectItem>
                          <SelectItem value="Romantic">Romantic</SelectItem>
                          <SelectItem value="Surreal">Surreal</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row w-full  md:w-1/2 justify-center md:justify-start gap-4">
              <FormField
                control={form.control}
                name="real_or_generated"
                render={({ field }) => (
                  <FormItem className="flex ">
                    <FormControl className="flex">
                      <RadioGroup
                        defaultValue="generated"
                        className="flex flex-col"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="generated" id="r1" />
                          <Label htmlFor="r1">Generated Quote</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="real" id="r2" />
                          <Label htmlFor="r2">Real Quote</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button type="submit">Generate Quote</Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
