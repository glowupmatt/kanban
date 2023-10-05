"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import classNames from "classNames";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  newBoardColumns: string[];
  oldBoardColumns: string[];
  isFormValid: boolean;
};

const EditColumnSubmitButton = (props: Props) => {
  const { newBoardColumns, oldBoardColumns, isFormValid } = props;
  const boardColumnIsEmpty = newBoardColumns.every((column) => column.length);
  const noColumns = newBoardColumns.length <= 0;

  return (
    <Button
      type="submit"
      disabled={!isFormValid || !boardColumnIsEmpty}
      className={classNames(
        "flex text-white rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 w-full",
        {
          "bg-red-main cursor-not-allowed": !isFormValid || !boardColumnIsEmpty,
        },
        { "bg-purple-main cursor-pointer": isFormValid }
      )}
    >
      <DialogClose>
        <p className="font-[700]">Submit Changes</p>
      </DialogClose>
    </Button>
  );
};

export default EditColumnSubmitButton;
