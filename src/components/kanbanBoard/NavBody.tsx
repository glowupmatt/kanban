"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import BoardMenu from "./BoardMenu";
import EditBoardModal from "./editBoard/EditBoardModal";
import classNames from "classNames";
import { BoardDataType } from "@/types/boardData";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardOpen: boolean;
  selectedBoardId: string;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: BoardDataType[];
  setSelectedBoardId: React.Dispatch<React.SetStateAction<any>>;
  displayBoard: any;
};

const NavBody = (props: Props) => {
  const {
    setBoardOpen,
    boardOpen,
    selectedBoardId,
    updated,
    setUpdated,
    boardData,
    setSelectedBoardId,
    displayBoard,
  } = props;
  //Sets edit board modal open/close
  const [editBoardToggle, setEditBoardToggle] = useState(false);
  return (
    <div className="w-full flex justify-center items-center">
      {/* Nav Bar controls modal toggle with Menu and Edit Board*/}
      <div className={classNames("w-full")}>
        <Nav
          setBoardOpen={setBoardOpen}
          boardOpen={boardOpen}
          selectedBoardId={selectedBoardId}
          setEditBoardToggle={setEditBoardToggle}
          displayBoard={displayBoard}
        />
      </div>
      {!boardOpen ? null : (
        <BoardMenu
          setBoardOpen={setBoardOpen}
          boardData={boardData}
          setSelectedBoardId={setSelectedBoardId}
          selectedBoardId={selectedBoardId}
          setUpdated={setUpdated}
        />
      )}
      {!editBoardToggle ? null : (
        <EditBoardModal
          setEditBoardToggle={setEditBoardToggle}
          boardData={boardData}
          editBoardToggle={editBoardToggle}
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          setUpdated={setUpdated}
          displayBoard={displayBoard}
        />
      )}
      {/* Nav Bar controls modal toggle with Menu and Edit Board*/}
    </div>
  );
};

export default NavBody;
