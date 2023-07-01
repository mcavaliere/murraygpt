"use client";

import Link from "next/link";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
});

export function QuoteForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
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
              <FormItem>
                <FormLabel>Tone</FormLabel>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
