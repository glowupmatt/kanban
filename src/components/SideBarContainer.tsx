import React from "react";
import classNames from "classNames";
import Image from "next/image";
import SideBar from "./kanbanBoard/SideBar";
import { BoardDataType } from "@/types/boardData";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardOpen: boolean;
  boardData: BoardDataType[];
  setSelectedBoardId: React.Dispatch<string>;
  selectedBoardId: string;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarContainer = (props: Props) => {
  const {
    setBoardOpen,
    boardOpen,
    boardData,
    setSelectedBoardId,
    selectedBoardId,
    setUpdated,
  } = props;
  return (
    <div
      className={classNames(
        "h-full border-r-solid border-r-2 dark:border-r-grey-dark dark:bg-grey-darkest min-w-[16.25rem] bg-white",
        {
          "md:hidden hidden": boardOpen,
        },
        {
          "hidden md:block": !boardOpen,
        }
      )}
    >
      <div className={classNames("flex flex-col lg:gap-[3.3rem] h-full")}>
        <div className="w-full flex justify-center p-[1rem] min-h-[4.4rem]">
          <Image
            src="/KanbanFiles/kanabDesktopLogo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="min-w-[9.533rem] min-h-[1.5765rem] hidden dark:block"
          />
          <Image
            src="/KanbanFiles/lightModeKanbanLogo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="min-w-[9.533rem] min-h-[1.5765rem] hidden md:block dark:hidden"
          />
        </div>
        <div className={classNames("w-full h-full hidden md:block")}>
          <SideBar
            setBoardOpen={setBoardOpen}
            boardData={boardData}
            setSelectedBoardId={setSelectedBoardId}
            selectedBoardId={selectedBoardId}
            setUpdated={setUpdated}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarContainer;
