import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple } from "@mui/material/colors";
import LightDarkTheme from "../LightDarkTheme";
import CreateBoard from "./CreateBoard";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardMenu = (props: Props) => {
  const { setBoardOpen } = props;
  return (
    <div className="max-w-[16.5rem] w-full bg-grey-light dark:bg-grey-dark p-[1.5rem] rounded-lg min-h-[15rem] justify-between flex flex-col items-start">
      <h4 className="opacity-[.6]">All Boards (1)</h4>
      <div className="flex justify-center items-center gap-[.75rem]">
        <DashboardIcon />
        <h3 className="opacity-[.6]">Board Name</h3>
      </div>
      <div className="flex justify-center items-center gap-[.75rem]">
        <DashboardIcon />
        <div className="flex gap-1 justify-center items-center">
          <AddIcon sx={{ color: deepPurple[500] }} />
          <h3 className="text-[#673ab7]">
            <CreateBoard setBoardOpen={setBoardOpen} />
          </h3>
        </div>
      </div>
      <LightDarkTheme />
    </div>
  );
};

export default BoardMenu;
