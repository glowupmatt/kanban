import React from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deepPurple, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classNames from "classNames";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardOpen: boolean;
  selectedBoardId: any;
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: any;
};

const Nav = (props: Props) => {
  const {
    setBoardOpen,
    boardOpen,
    selectedBoardId,
    setEditBoardToggle,
    displayBoard,
  } = props;

  return (
    <nav className="flex justify-evenly items-center gap-4 p-4 w-full bg-white dark:bg-grey-darkest">
      <Image
        src="/KanbanFiles/kanbanLogo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="w-[1.5rem] h-[1.5625rem]"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-[.6rem]">
          {displayBoard.length < 0 && selectedBoardId ? (
            <h2 onClick={() => setBoardOpen((prev) => !prev)}>
              {displayBoard[0]?.title}
            </h2>
          ) : (
            <h2 onClick={() => setBoardOpen((prev) => !prev)}>Select Board</h2>
          )}

          <div
            onClick={() => setBoardOpen((prev) => !prev)}
            className={classNames(
              "h-full",
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
          <Button className="p-4 bg-purple-main max-w-[3rem] max-h-[2rem] flex justify-center items-center rounded-full hover:bg-purple-hover">
            <AddIcon sx={{ color: grey[50] }} />
          </Button>
          <div onClick={() => setEditBoardToggle((prev) => !prev)}>
            <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;