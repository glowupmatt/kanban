"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import LightDarkTheme from "../LightDarkTheme";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};
export type VARIANT = "SIGN_IN" | "SIGN_UP";

const LoginOrRegister = (props: Props) => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<VARIANT>("SIGN_IN");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);
  const onSubmit = (data: any) => {
    if (variant === "SIGN_UP") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "SIGN_IN") {
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
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {variant === "SIGN_IN" ? (
        <Login setVariant={setVariant} onSubmit={onSubmit} />
      ) : (
        <Register setVariant={setVariant} onSubmit={onSubmit} />
      )}
      <LightDarkTheme />
    </div>
  );
};

export default LoginOrRegister;
