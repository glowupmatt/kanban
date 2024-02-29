"use client";
import React, { useState } from "react";
import Input from "@/components/reusableAssetes/Input";
import handelFormSubmit from "./authHooks/useLogin";
import Button from "@/components/reusableAssetes/Button";
import { FieldValues, useForm } from "react-hook-form";
import { useToggleVariant } from "./authHooks/useVariant";

type Props = {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

const LoginFormInput = (props: Props) => {
  const { setIsLoading, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { variant } = useToggleVariant();
  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(
        handelFormSubmit(variant, setIsLoading, handleSubmit)
      )}
    >
      {variant === "REGISTER" && (
        <Input
          id="name"
          label="Name"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      )}
      <Input
        id="email"
        label="Email address"
        type="email"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <div className="w-full justify-between flex">
        <Button disabled={isLoading} type="submit">
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default LoginFormInput;
