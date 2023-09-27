import React from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deepPurple, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = (props: Props) => {
  const { setBoardOpen } = props;
  return (
    <nav className="flex justify-evenly items-center gap-4 p-4 w-full">
      <Image
        src="/KanbanFiles/kanbanLogo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="w-[1.5rem] h-[1.5625rem]"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-[.6rem]">
          <h2>Board Name</h2>
          <KeyboardArrowDownIcon sx={{ color: deepPurple[`A100`] }} />
        </div>
        <div className="flex gap-[.5rem] justify-center items-center">
          <Button
            onClick={() => setBoardOpen((prev) => !prev)}
            className="p-4 bg-purple-main max-w-[3rem] max-h-[2rem] flex justify-center items-center rounded-full hover:bg-purple-hover"
          >
            <AddIcon sx={{ color: grey[50] }} />
          </Button>
          <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
