"use client";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { deepPurple } from "@mui/material/colors";
import LightDarkTheme from "../LightDarkTheme";
import CreateBoard from "./CreateBoard";
import axios from "axios";
import classNames from "classNames";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: any;
  setSelectedBoard: React.Dispatch<any>;
  selectedBoard: any;
};

const BoardMenu = (props: Props) => {
  const { setBoardOpen, boardData, setSelectedBoard, selectedBoard } = props;
  console.log(selectedBoard, "SELECTED BOARD");

  return (
    <div className="absolute top-[5rem] z-10 max-w-full w-[17rem] bg-grey-light dark:bg-grey-dark gap-4 rounded-lg min-h-[15rem] justify-between flex flex-col items-start">
      <h4 className="opacity-[.6] px-[1.5rem] pt-[1.5rem]">
        All Boards ({boardData.length})
      </h4>
      <div className="flex gap-[0.87rem] flex-col w-full">
        {boardData.map((board: any) => {
          const { title, id } = board;
          const onclickHandler = async () => {
            const res = await axios
              .get(`/api/createBoard/${id}`)
              .then((res) => res.data);
            setSelectedBoard(res);
            setBoardOpen(false);
          };
          return (
            <div
              key={parseFloat(id) + Math.floor(Math.random() * 1000)}
              onClick={onclickHandler}
              className={classNames(
                "flex justify-center items-center gap-[.75rem]",
                {
                  "bg-purple-main p-4 rounded-r-full w-[70%]":
                    selectedBoard?.id === id,
                },
                {
                  "ml-[1.5rem]": selectedBoard?.id !== id,
                }
              )}
            >
              <DashboardIcon />
              <h3
                className={classNames(
                  "w-full",
                  { "text-white opacity-100": selectedBoard?.id === id },
                  { "opacity-[.6]": selectedBoard?.id !== id }
                )}
              >
                {title}
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
