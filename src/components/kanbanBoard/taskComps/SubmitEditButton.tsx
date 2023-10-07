import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import classNames from "classnames";
type Props = {};

const SubmitEditButton = (props: Props) => {
  return (
    <Button
      type="submit"
      className={classNames(
        "flex text-white rounded-full max-h-[2.5rem] max-w-[18.4375rem] justify-center items-center gap-1 w-full bg-purple-main cursor-pointer"
      )}
    >
      <DialogClose>
        <p className="font-[700]">Submit Changes</p>
      </DialogClose>
    </Button>
  );
};

export default SubmitEditButton;
