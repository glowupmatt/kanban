"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { grey } from "@mui/material/colors";
import { useTheme } from "next-themes";

type Props = {};

const LightDarkTheme = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const onCheckedHandler = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="w-[14rem] flex justify-center items-center gap-4 p-4 bg-[#F4F7FD] dark:bg-[#20212C] rounded-lg">
      <LightModeIcon
        sx={{ color: "grey"[200] }}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition duration-700 dark:-rotate-90 dark:opacity-[.2] opacity-100"
      />
      <Switch className="" onCheckedChange={onCheckedHandler} />
      <DarkModeIcon
        sx={{ color: "grey"[200] }}
        className="h-[1.2rem] w-[1.2rem] rotate-90 transition duration-700 dark:rotate-0 opacity-[.2] dark:opacity-100"
      />
    </div>
  );
};

export default LightDarkTheme;
