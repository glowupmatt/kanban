import React from "react";
import CreateBoard from "../kanbanBoard/CreateBoard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple } from "@mui/material/colors";

type Props = {
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBoardSidebarToggle = (props: Props) => {
  const { setUpdated } = props;
  return (
    <div className="flex justify-start items-center gap-[.75rem] pl-[1.5rem] h-[3rem]">
      <DashboardIcon />
      <div className="flex gap-1 justify-center items-center">
        <AddIcon sx={{ color: deepPurple[500] }} />
        <h3 className="text-[#673ab7]">
          <CreateBoard setUpdated={setUpdated} />
        </h3>
      </div>
    </div>
  );
};

export default AddBoardSidebarToggle;
