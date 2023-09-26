import React from "react";
import LoginOrRegister from "@/components/loginRegister/LoginOrRegister";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="w-full">
      <LoginOrRegister />
    </div>
  );
};

export default Home;
