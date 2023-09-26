import AuthForm from "@/components/AuthForm";
import LightDarkTheme from "@/components/LightDarkTheme";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <AuthForm />
      <LightDarkTheme />
    </div>
  );
};

export default Home;
