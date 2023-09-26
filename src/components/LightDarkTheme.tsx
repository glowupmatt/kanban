"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { grey } from "@mui/material/colors";
import { useTheme } from "next-themes";

type Props = {};

const LightDarkTheme = (props: Props) => {
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useTheme();

  toggle === true ? setTheme("light") : setTheme("dark");

  const onCheckedHandler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="w-[14rem] flex justify-center items-center gap-4 p-4 bg-[#F4F7FD] dark:bg-[#20212C] rounded-lg">
      <LightModeIcon
        sx={{ color: "grey"[200] }}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition duration-700 dark:-rotate-90"
      />
      <Switch className="" onCheckedChange={onCheckedHandler} />
      <DarkModeIcon
        sx={{ color: "grey"[200] }}
        className="h-[1.2rem] w-[1.2rem] rotate-90 transition duration-700 dark:rotate-0 "
      />
    </div>
  );
};

export default LightDarkTheme;
