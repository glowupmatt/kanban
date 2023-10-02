"use client";
import React, { useContext } from "react";
import LightDarkTheme from "../LightDarkTheme";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "../ui/button";
import ColumnTitleSelector from "../sideBarComps/ColumnTitleSelector";
import AddBoardSidebarToggle from "../sideBarComps/AddBoardSidebarToggle";
import { DataContext } from "@/context/AppContext";

type Props = {};

const SideBar = (props: Props) => {
  const { setBoardOpen } = useContext(DataContext);
  return (
    <div className="h-full w-full flex flex-col gap-[1rem] overflow-scroll justify-between">
      <div className="flex flex-col">
        <ColumnTitleSelector />
        <div className="">
          <AddBoardSidebarToggle />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 lg:relative lg:justify-center left-0 w-[16rem]">
        <LightDarkTheme />
        <Button
          className="text-grey-medium shadow-none p-0 self-start bg-transparent dark:hover:bg-white hover:bg-grey-light rounded-r-full rounded-l-none h-[3rem] w-[90%]"
          onClick={() => setBoardOpen((prev) => !prev)}
        >
          <div className="flex gap-3 p-[1.5rem]">
            <VisibilityOffIcon />
            <p>Hide Sidebar</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
