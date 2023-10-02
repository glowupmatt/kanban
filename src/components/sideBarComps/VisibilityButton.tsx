import classNames from "classNames";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

type Props = {
  setBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardOpen: boolean;
};

const VisibilityButton = (props: Props) => {
  const { setBoardOpen, boardOpen } = props;
  return (
    <div
      className={classNames(
        "absolute z-10 left-[0] bottom-[2rem] items-end flex",
        { "hidden md:hidden": !boardOpen },

        { "hidden md:block": boardOpen }
      )}
    >
      <div
        className="relative rounded-r-full bg-purple-main h-[3rem] w-[3.5rem] flex justify-center items-center hover:bg-purple-hover cursor-pointer"
        onClick={() => setBoardOpen((prev) => !prev)}
      >
        <VisibilityIcon className="text-white" />
      </div>
    </div>
  );
};

export default VisibilityButton;
