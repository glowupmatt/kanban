import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateBoard from "../CreateBoard";

type Props = {};

const NoColumnsDisplay = (props: Props) => {
  return (
    <div className="h-screen flex  justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-[2.5rem]">
        <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
          There is no board selected. Create a new board to get started.
        </h2>
        <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4 cursor-pointer hover:bg-purple-hover">
          <AddIcon sx={{ color: "white" }} />
          <CreateBoard />
        </div>
      </div>
    </div>
  );
};

export default NoColumnsDisplay;
