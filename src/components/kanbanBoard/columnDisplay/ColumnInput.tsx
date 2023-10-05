import React from "react";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  title: string;
  index: number;
  setOldBoardColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setDeleteColumnIdHolder: React.Dispatch<React.SetStateAction<string[]>>;
  setLocalUpdatedState: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ColumnInput = (props: Props) => {
  const {
    title,
    index,
    setOldBoardColumns,
    setLocalUpdatedState,
    setDeleteColumnIdHolder,
    id,
  } = props;
  const oldColumnOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setOldBoardColumns((prev) => {
      const newBoardColumns = prev;
      newBoardColumns[index] = value;
      return newBoardColumns;
    });
    setLocalUpdatedState(true);
  };

  const onIdBufferHandler = (id: string) => {
    setDeleteColumnIdHolder((prev: string[]) => [...prev, id]);
  };
  return (
    <div className="flex items-center gap-3 w-full" key={index}>
      <Input
        id="newBoardColumns"
        type="text"
        onChange={(e) => oldColumnOnChangeHandler(e, index)}
        placeholder={title}
        className="dark:border-grey-light border-grey-darkest border-solid border-2"
      />

      <div onClick={() => onIdBufferHandler(id)}>
        <CloseIcon className="text-grey-medium" />
      </div>
      {/* Maps over all the columns and filters the columns that have their Ids stored in the deleteColumnIdHolder*/}
    </div>
  );
};

export default ColumnInput;
