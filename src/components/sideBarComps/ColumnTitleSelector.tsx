import { BoardDataType } from "@/types/boardData";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";
import classNames from "classNames";
import React from "react";

type Props = {
  boardData: BoardDataType[];
  setSelectedBoardId: React.Dispatch<string>;
  selectedBoardId: string;
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnTitleSelector = (props: Props) => {
  const { boardData, setSelectedBoardId, selectedBoardId, setBoardOpen } =
    props;
  return (
    <div className="h-full">
      {boardData.map((board: BoardDataType) => {
        const { id } = board;
        const onclickHandler = async () => {
          try {
            await axios
              .get(`/api/createBoard/${id}`)
              .then((res) => setSelectedBoardId(res.data.id))
              .finally(() => setBoardOpen(false));
          } catch (error) {
            console.log(error);
          }
        };
        return (
          <div
            key={parseFloat(id) + Math.floor(Math.random() * 1000)}
            onClick={onclickHandler}
            className={classNames(
              "flex w-full justify-center items-center gap-[.75rem] cursor-pointer h-[3rem] pl-[1.5rem]",
              {
                "bg-purple-main rounded-r-full w-[70%] hover:bg-purple-hover transition ease-in-out duration-400":
                  selectedBoardId === id,
              },
              {
                " hover:bg-grey-light hover:text-purple-main bg-transparent transition ease-in-out duration-400 rounded-r-full w-[70%]":
                  selectedBoardId !== id,
              }
            )}
          >
            <DashboardIcon />
            <h3
              className={classNames(
                "w-full",
                { "text-white opacity-100": selectedBoardId === id },
                { "opacity-[.6]": selectedBoardId !== id }
              )}
            >
              {board.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnTitleSelector;
