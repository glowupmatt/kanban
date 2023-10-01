import React from "react";
import AuthContext from "@/context/AuthContext";
import SideBar from "./kanbanBoard/SideBar";

type Props = {
  children: React.ReactNode;
};

const TemplateLayout = (props: Props) => {
  const { children } = props;
  return (
    <AuthContext>
      <main>
        <div className="flex justify-center items-center">{children}</div>
      </main>
    </AuthContext>
  );
};

export default TemplateLayout;
