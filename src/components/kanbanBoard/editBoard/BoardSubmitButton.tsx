import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import classNames from "classNames";
import React from "react";

type Props = {
  newBoardColumns: string[];
};

const BoardSubmitButton = (props: Props) => {
  const { newBoardColumns } = props;

  return (
    <Button
      type="submit"
      disabled={newBoardColumns.length <= 0}
      className={classNames(
        "flex text-white rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 w-full",
        {
          "bg-red-main cursor-not-allowed": newBoardColumns.length <= 0,
        },
        { "bg-purple-main cursor-pointer": newBoardColumns.length > 0 }
      )}
    >
      {newBoardColumns.length <= 0 || newBoardColumns[0] === "" ? (
        <div>
          <p className="text-white">Must Add A Column</p>
        </div>
      ) : (
        <DialogClose>
          <p className="font-[700]">Create New Board</p>
        </DialogClose>
      )}
    </Button>
  );
};

export default BoardSubmitButton;
