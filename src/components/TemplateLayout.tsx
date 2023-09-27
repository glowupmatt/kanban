import React from "react";
import AuthContext from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const TemplateLayout = (props: Props) => {
  const { children } = props;
  return (
    <AuthContext>
      <main className="">{children}</main>
    </AuthContext>
  );
};

export default TemplateLayout;
