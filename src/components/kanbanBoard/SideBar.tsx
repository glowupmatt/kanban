import React from "react";
import LightDarkTheme from "../LightDarkTheme";
import { BoardDataType } from "@/types/boardData";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "../ui/button";
import ColumnTitleSelector from "../sideBarComps/ColumnTitleSelector";
import AddBoardSidebarToggle from "../sideBarComps/AddBoardSidebarToggle";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: BoardDataType[];
  setSelectedBoardId: React.Dispatch<string>;
  selectedBoardId: string;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = (props: Props) => {
  const {
    setBoardOpen,
    boardData,
    setSelectedBoardId,
    selectedBoardId,
    setUpdated,
  } = props;
  return (
    <div className="h-full w-full flex flex-col gap-[1rem] overflow-scroll justify-between">
      <div className="flex flex-col">
        <ColumnTitleSelector
          setSelectedBoardId={setSelectedBoardId}
          boardData={boardData}
          selectedBoardId={selectedBoardId}
          setBoardOpen={setBoardOpen}
        />
        <div className="xl:hidden">
          <AddBoardSidebarToggle setUpdated={setUpdated} />
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
