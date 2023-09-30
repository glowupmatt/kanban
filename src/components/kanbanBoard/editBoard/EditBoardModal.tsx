"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classNames";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CreateBoard from "../CreateBoard";
import CreateColumn from "../CreateColumn";

type Props = {
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
  editBoardToggle: boolean;
  selectedBoardId: any;
  setSelectedBoardId: React.Dispatch<React.SetStateAction<any>>;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  boardData: any;
  displayBoard: any;
};

const EditBoardModal = (props: Props) => {
  const {
    setEditBoardToggle,
    editBoardToggle,
    selectedBoardId,
    setSelectedBoardId,
    setUpdated,
    boardData,
    displayBoard,
  } = props;
  return (
    <div>
      <div className={classNames("absolute top-[4rem] right-[1rem] z-10")}>
        <Card className=" min-h-[5.875rem] min-w-[12rem] bg-white dark:bg-grey-dark rounded-lg">
          {!selectedBoardId ? (
            <CardContent className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-start pl-4">
              <CreateBoard setUpdated={setUpdated} />
            </CardContent>
          ) : (
            <CardContent className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-start pl-4">
              <CreateColumn
                selectedBoardId={selectedBoardId}
                setUpdated={setUpdated}
                boardData={boardData}
                displayBoard={displayBoard}
              />
              <DeleteConfirmationModal
                selectedBoardId={selectedBoardId}
                setSelectedBoardId={setSelectedBoardId}
                setUpdated={setUpdated}
                setEditBoardToggle={setEditBoardToggle}
              />
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EditBoardModal;
