"use client";
import React, { useContext } from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deepPurple, grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classNames from "classNames";
import CreateTaskModal from "./taskComps/CreateTaskModal";
import { DataContext } from "@/context/AppContext";

type Props = {
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = (props: Props) => {
  const { setEditBoardToggle } = props;
  const { displayBoard, setBoardOpen, boardOpen } = useContext(DataContext);

  return (
    <nav className="flex justify-evenly items-center gap-4 p-4 w-full bg-white dark:bg-grey-darkest">
      <Image
        src="/KanbanFiles/kanbanLogo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="w-[1.5rem] h-[1.5625rem] md:hidden"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-[.6rem]">
          {displayBoard?.title !== "" ? (
            <div>
              <h2 className="hidden md:block"> {displayBoard?.title}</h2>
              <h2
                onClick={() => setBoardOpen((prev) => !prev)}
                className="md:hidden"
              >
                {displayBoard?.title}
              </h2>
            </div>
          ) : (
            <div>
              <h2 className="hidden md:block">Select Board</h2>
              <h2
                onClick={() => setBoardOpen((prev) => !prev)}
                className="md:hidden"
              >
                Select Board
              </h2>
            </div>
          )}

          <div
            onClick={() => setBoardOpen((prev) => !prev)}
            className={classNames(
              "h-full md:hidden",
              {
                "rotate-180 transform transition duration-500 ease-in-out":
                  boardOpen,
              },
              {
                "rotate-0 transform transition duration-500 ease-in-out":
                  !boardOpen,
              }
            )}
          >
            <KeyboardArrowDownIcon sx={{ color: deepPurple[`A100`] }} />
          </div>
        </div>
        <div className="flex gap-[.5rem] justify-center items-center">
          <CreateTaskModal />
          <div
            onClick={() => setEditBoardToggle((prev) => !prev)}
            className="cursor-pointer"
          >
            <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
