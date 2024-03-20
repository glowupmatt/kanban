"use client";
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CreateBoard from "../CreateBoard";
import CreateColumn from "../CreateColumn";
import { DataContext } from "@/context/AppContext";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

type Props = {
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditBoardModal = (props: Props) => {
  const { setEditBoardToggle } = props;
  const { displayBoard, boardData } = useContext(DataContext);
  const session = useSession();
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div className={classNames("absolute top-[4rem] right-[1rem] z-[500]")}>
        <Card className=" min-h-[5.875rem] min-w-[12rem] bg-white dark:bg-grey-dark rounded-lg  p-4">
          {displayBoard.columns.length <= 0 || boardData.length <= 0 ? (
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
          <div className="w-full justify-center align-center flex">
            <Button
              onClick={logoutHandler}
              className="bg-purple-main text-grey-light hover:bg-purple-hover"
            >
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EditBoardModal;
