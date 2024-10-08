"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { signup } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

// TODO: Add profile picture field

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .regex(/^[A-Z][a-z ]+$/, {
        message:
          "First name must start with a capital letter, and contain only letters and spaces.",
      }),
    middleName: z
      .string()
      .regex(/^[A-Z][a-z ]*$|^$/, {
        message:
          "Middle name must start with a capital letter, and contain only letters and spaces.",
      })
      .nullish(),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .regex(/^[A-Z][a-z ]+$/, {
        message:
          "Last name must start with a capital letter, and contain only letters and spaces.",
      }),
    email: z.string().email("Invalid email address."),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(15, {
        message: "Username must be at most 15 characters.",
      })
      .regex(/^[a-z0-9_-]{3,16}$/, {
        message:
          "Username must contain only lowercase letters, numbers, hyphens, and underscores.",
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
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
  });

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const middleNameExists =
      !values.middleName || values.middleName.trim() === "" ? false : true;
    toast.promise(
      () =>
        signup({
          ...values,
          fullName: middleNameExists
            ? `${values.firstName} ${values.middleName} ${values.lastName}`
            : `${values.firstName} ${values.lastName}`,
        }),
      {
        success: () => {
          router.push("/");
          return (
            <>
              <p className="font-semibold text-lg">Sign up successful!</p>
              <p>Please login to continue...</p>
            </>
          );
        },
        loading: "Signing up...",
        error: (error) =>
          error instanceof AxiosError ? error.response?.data.message : error,
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid xl:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
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
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Middle Name"
                    {...field}
                    value={field.value || undefined}
                    className="bg-[#D8D6E7] dark:bg-[#149ABA] dark:placeholder:text-secondary dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    value={field.value || undefined}
                    className="bg-[#D8D6E7] dark:bg-[#149ABA] dark:placeholder:text-secondary dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username *</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="bg-[#D8D6E7] dark:bg-[#149ABA] dark:placeholder:text-secondary dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password *</FormLabel>
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
