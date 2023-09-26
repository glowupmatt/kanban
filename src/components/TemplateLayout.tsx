import React from "react";
import AuthContext from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const TemplateLayout = (props: Props) => {
  const { children } = props;
  return (
    <AuthContext>
      <main className="h-screen flex justify-center items-center w-full">
        {children}
      </main>
    </AuthContext>
  );
};

export default TemplateLayout;
