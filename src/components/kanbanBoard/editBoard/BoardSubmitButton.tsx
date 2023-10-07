import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import classNames from "classnames";
import React from "react";

type Props = {
  newBoardColumns: string[];
  isFormValid: boolean;
};

const BoardSubmitButton = (props: Props) => {
  const { newBoardColumns, isFormValid } = props;

  return (
    <Button
      type="submit"
      disabled={!isFormValid}
      className={classNames(
        "flex text-white rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 w-full",
        {
          "bg-red-main cursor-not-allowed": newBoardColumns.length <= 0,
        },
        { "bg-purple-main cursor-pointer": newBoardColumns.length > 0 }
      )}
    >
      <DialogClose>
        <p className="font-[700]">Create New Board</p>
      </DialogClose>
    </Button>
  );
};

export default BoardSubmitButton;
