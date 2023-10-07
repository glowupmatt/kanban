"use client";
import { DataContext } from "@/context/AppContext";
import { BoardDataType } from "@/types/boardData";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";
import classNames from "classnames";
import React, { useContext } from "react";

type Props = {};

const ColumnTitleSelector = (props: Props) => {
  const { boardData, selectedBoardId, setSelectedBoardId } =
    useContext(DataContext);
  return (
    <div className="h-full">
      {boardData.map((board: BoardDataType, index) => {
        const { id } = board;
        const onclickHandler = async () => {
          setSelectedBoardId(id);
        };
        return (
          <div
            key={index}
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
