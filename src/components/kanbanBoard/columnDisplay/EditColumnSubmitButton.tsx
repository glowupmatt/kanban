"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  newBoardColumns: string[];
  oldBoardColumns: string[];
};

const EditColumnSubmitButton = (props: Props) => {
  const { newBoardColumns, oldBoardColumns } = props;

  const [disabled, setDisabled] = useState(true);

  const disabledHandler =
    (newBoardColumns?.map((string) => string === "").includes(true) &&
      oldBoardColumns?.map((string) => string === "").includes(true)) ||
    newBoardColumns?.length <= 0 ||
    oldBoardColumns?.length <= 0;

  return (
    <Button
      type="submit"
      disabled={
        (newBoardColumns?.map((string) => string === "").includes(true) &&
          oldBoardColumns?.map((string) => string === "").includes(true)) ||
        newBoardColumns?.length <= 0 ||
        oldBoardColumns?.length <= 0
      }
      className={classNames(
        "flex text-white rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 w-full",
        {
          "bg-red-main cursor-not-allowed": disabledHandler,
        },
        { "bg-purple-main cursor-pointer": !disabledHandler }
      )}
    >
      {disabledHandler ? (
        <div>
          <p className="text-white">Must Add A Column</p>
        </div>
      ) : (
        <DialogClose>
          <p className="font-[700]">Submit Changes</p>
        </DialogClose>
      )}
    </Button>
  );
};

export default EditColumnSubmitButton;
