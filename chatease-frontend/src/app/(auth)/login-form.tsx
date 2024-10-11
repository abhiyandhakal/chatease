"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(15, {
      message: "Username must be at most 15 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must be at most 30 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    ),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("accessToken") ? true : false,
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(() => login(values), {
      success: (res) => {
        router.push("/chats");
        const { token } = res?.data;
        Cookies.set("accessToken", token);
        router.push("/chats");
        setIsLoggedIn(true);
        return res.data?.message || "Logged in successfully";
      },
      loading: "Logging in...",
      error: (error) =>
        error instanceof AxiosError ? error.response?.data?.message : error,
    });
  }

  if (!isLoggedIn) {
    return (
      <Card className="bg-secondary border-none shadow-lg px-8 py-6 max-w-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe"
                        {...field}
                        className="bg-[#D8D6E7] dark:bg-[#149ABA] dark:placeholder:text-secondary dark:text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="•••••••••••••••"
                        type="password"
                        {...field}
                        className="bg-[#D8D6E7] dark:bg-[#149ABA] dark:placeholder:text-secondary dark:text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary border-none shadow-lg px-8 py-6 max-w-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-4xl">
          Already Logged In?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl text-center">
          You are already logged in. Click{" "}
          <a href="/chats" className="text-link underline">
            here
          </a>{" "}
          to go to the chats page.
        </p>
      </CardContent>
    </Card>
  );
}
