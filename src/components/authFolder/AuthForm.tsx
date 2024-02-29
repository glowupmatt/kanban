"use client";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Button from "@/components/reusableAssetes/Button";
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
        {/* Email Password Input */}
        <form
          onSubmit={handleSubmit(
            useGuestSubmit(setIsLoading, handleSubmit, router)
          )}
        >
          <LoginFormInput setIsLoading={setIsLoading} isLoading={isLoading} />
          <Button>Continue as Guest</Button>
        </form>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? "New to Kanban?" : "Already have an account"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
