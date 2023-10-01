"use client";
import React, { use, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple } from "@mui/material/colors";
import LightDarkTheme from "../LightDarkTheme";
import CreateBoard from "./CreateBoard";
import axios from "axios";
import classNames from "classNames";
import { BoardDataType } from "@/types/boardData";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "../ui/button";

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
    <div className="h-full w-full flex flex-col justify-between">
      <div>
        <h4 className="opacity-[.6] mb-[2.06rem] pl-[1.5rem]">
          All Boards ({boardData.length})
        </h4>
        <div className="flex flex-col">
          {boardData.map((board: any) => {
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
                    "bg-purple-main rounded-r-full w-[70%]":
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
        <div className="flex justify-start items-center gap-[.75rem] pl-[1.5rem] mt-[1.8rem]">
          <DashboardIcon />
          <div className="flex gap-1 justify-center items-center">
            <AddIcon sx={{ color: deepPurple[500] }} />
            <h3 className="text-[#673ab7]">
              <CreateBoard setUpdated={setUpdated} />
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 mb-[2rem]">
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
