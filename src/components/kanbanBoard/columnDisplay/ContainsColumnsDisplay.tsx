import React, { useContext } from "react";
import { ColumnsType } from "@/types/columnsType";
import CreateColumn from "../CreateColumn";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "./TodoList";
import { DataContext } from "@/context/AppContext";

type Props = {};

const ContainsColumnsDisplay = (props: Props) => {
  const { selectedBoardId, displayBoard } = useContext(DataContext);
  const columns: ColumnsType[] = displayBoard?.columns;
  return (
    <div className="w-full h-full">
      {(selectedBoardId === "" && columns?.length <= 0) ||
      columns?.length <= 0 ? (
        <div className="flex flex-col justify-center items-center gap-[2.5rem] h-full">
          <h2 className="text-grey-medium text-center max-w-[21.4375rem ]">
            There are no Columns. Create a new column to get started.
          </h2>
          <div className="bg-purple-main flex justify-center gap-1 items-center text-grey-lighter text-white w-full max-w-[10.875rem] h-full max-h-[3rem] rounded-full p-4 cursor-pointer hover:bg-purple-hover">
            <AddIcon sx={{ color: "white" }} />
            <CreateColumn />
          </div>
        </div>
      ) : (
        <div className="h-full flex p-4 gap-4">
          {columns?.map((column: ColumnsType, index: number) => {
            return <TodoList key={index} column={column} />;
          })}
          <div
            className="h-full min-h-[70vh] min-w-[17.5rem] flex justify-center items-center gap-2 shadow-md border-dashed border-[4px] rounded-md dark:bg-gradient-to-t dark:from-grey-dark/30 dark:to-black-dark dark:border-purple-main bg-gradient-to-t from-grey-light to-white/50 border-purple-hover 
"
          >
            <CreateColumn />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainsColumnsDisplay;
