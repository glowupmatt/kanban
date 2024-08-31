"use client";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Button from "@/components/reusableAssets/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToggleVariant } from "./authHooks/useVariant";
import useGuestSubmit from "./authHooks/useGuestLogin";
import LoginFormInput from "./LoginFormInput";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { variant, toggleVariant } = useToggleVariant();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/kanban");
    }
  }, [session?.status, router]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex flex-col gap-2 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <LoginFormInput
          variant={variant}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <form onSubmit={handleSubmit(useGuestSubmit(setIsLoading, router))}>
          <Button>Continue as Guest</Button>
        </form>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-600">
          <div onClick={toggleVariant}>
            {variant === "LOGIN" ? "New to Kanban?" : "Already have an account"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "REGISTER" ? "Create an account" : "Register here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
