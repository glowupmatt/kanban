"use client";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useGuestSubmit = (
  setIsLoading: (isLoading: boolean) => void,
  router: AppRouterInstance,
): SubmitHandler<FieldValues> => {
  return (data, event) => {
    setIsLoading(true);
    signIn("credentials", {
      name: "guest",
      email: "guest@guest.com",
      password: "guest",
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
      .finally(() => {
        setIsLoading(false);
      });
  };
};

export default useGuestSubmit;
