import React from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deepPurple, grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classNames from "classNames";
import { BoardDataType } from "@/types/boardData";
import CreateTaskModal from "./taskComps/CreateTaskModal";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardOpen: boolean;
  selectedBoardId: string;
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: BoardDataType[];
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
        className="w-[1.5rem] h-[1.5625rem] md:hidden"
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-[.6rem]">
          {(displayBoard[0]?.title.length > 0 && selectedBoardId) ||
          displayBoard.length < 0 ? (
            <div>
              <h2 className="hidden md:block"> {displayBoard[0].title}</h2>
              <h2
                onClick={() => setBoardOpen((prev) => !prev)}
                className="md:hidden"
              >
                {displayBoard[0].title}
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
          <div onClick={() => setEditBoardToggle((prev) => !prev)}>
            <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
