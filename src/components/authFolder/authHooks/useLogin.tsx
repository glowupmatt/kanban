"use client";
import axios from "axios";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const handleFormSubmit = (
  variant: Variant,
  setIsLoading: (isLoading: boolean) => void,
  data: FieldValues
): SubmitHandler<FieldValues> => {
  return (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      const router = useRouter();
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/kanban");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
};

export default handleFormSubmit;
