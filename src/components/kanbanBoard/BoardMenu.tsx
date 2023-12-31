"use client";
import React, { useContext } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple } from "@mui/material/colors";
import LightDarkTheme from "../LightDarkTheme";
import CreateBoard from "./CreateBoard";
import axios from "axios";
import classNames from "classnames";
import { DataContext } from "@/context/AppContext";
type Props = {};

const BoardMenu = (props: Props) => {
  const {
    boardData,
    selectedBoardId,
    setSelectedBoardId,
    setUpdated,
    setBoardOpen,
  } = useContext(DataContext);

  return (
    <div className="absolute top-[5rem] z-10 max-w-full w-[17rem] bg-white dark:bg-grey-dark gap-4 rounded-lg min-h-[15rem] justify-between flex flex-col items-start md:hidden">
      <h4 className="opacity-[.6] px-[1.5rem] pt-[1.5rem]">
        All Boards ({boardData.length})
      </h4>
      <div className="flex gap-[0.87rem] flex-col w-full">
        {boardData.map((board: any) => {
          const { id } = board;
          const onclickHandler = () => {
            setSelectedBoardId(id);
          };
          return (
            <div
              key={parseFloat(id) + Math.floor(Math.random() * 1000)}
              onClick={onclickHandler}
              className={classNames(
                "flex justify-center items-center gap-[.75rem]",
                {
                  "bg-purple-main p-4 rounded-r-full w-[70%]":
                    selectedBoardId === id,
                },
                {
                  "ml-[1.5rem]": selectedBoardId !== id,
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
      <div className="flex justify-center items-center gap-[.75rem] ml-[1.5rem]">
        <DashboardIcon />
        <div className="flex gap-1 justify-center items-center">
          <AddIcon sx={{ color: deepPurple[500] }} />
          <h3 className="text-[#673ab7]">
            <CreateBoard />
          </h3>
        </div>
      </div>
      <div className="w-full justify-center items-center flex p-4">
        <LightDarkTheme />
      </div>
    </div>
  );
};

export default BoardMenu;
