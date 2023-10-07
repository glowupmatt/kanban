import { Input } from "@/components/ui/input";
import { isStringEmpty } from "@/lib/inputChecker";
import classNames from "classnames";
import React from "react";

type Props = {
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
  setDidBoardNameChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardTitleInput = (props: Props) => {
  const { boardName, setBoardName, setDidBoardNameChange } = props;
  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
    setDidBoardNameChange(true);
  };
  return (
    <div>
      <label htmlFor="boardName" className="text-[0.75rem] font-[700]">
        Board Name
      </label>
      <div className="relative flex flex-col justify-center w-full">
        <Input
          placeholder="e.g. Web Design"
          id="boardName"
          type="text"
          value={boardName}
          onChange={boardNameOnChangeHandler}
          className={classNames(
            "border-solid border-2",
            { "border-red-main absolute": isStringEmpty(boardName) },
            {
              "dark:border-grey-light border-grey-darkest":
                isStringEmpty(boardName) === false,
            }
          )}
        />
        <p
          className={classNames(
            "text-end p-2 text-[0.8125rem] text-red-main",
            //prettier-ignore
            { "hidden": isStringEmpty(boardName) === false }
          )}
        >
          Cant be empty!
        </p>
      </div>
    </div>
  );
};

export default BoardTitleInput;
