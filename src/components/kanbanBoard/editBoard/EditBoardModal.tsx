"use client";
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classNames";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CreateBoard from "../CreateBoard";
import CreateColumn from "../CreateColumn";
import { DataContext } from "@/context/AppContext";

type Props = {
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditBoardModal = (props: Props) => {
  const { setEditBoardToggle } = props;
  const { selectedBoard } = useContext(DataContext);
  return (
    <div>
      <div className={classNames("absolute top-[4rem] right-[1rem] z-10")}>
        <Card className=" min-h-[5.875rem] min-w-[12rem] bg-white dark:bg-grey-dark rounded-lg">
          {!selectedBoard || selectedBoard.title === "" ? (
            <CardContent className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-start pl-4">
              <CreateBoard />
            </CardContent>
          ) : (
            <CardContent className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-center">
              <CreateColumn />
              <DeleteConfirmationModal
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
