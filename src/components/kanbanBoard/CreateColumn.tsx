"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import NoCurrentColumns from "./editBoard/NoCurrentColumns";
import HasColumns from "./editBoard/HasColumns";
import { ColumnsType } from "@/types/columnsType";
import { DataContext } from "@/context/AppContext";
import { isStringEmpty } from "@/lib/inputChecker";
import BoardTitleInput from "./editBoard/BoardTitleInput";
import BoardSubmitButton from "./editBoard/BoardSubmitButton";
import EditColumnSubmitButton from "./columnDisplay/EditColumnSubmitButton";

type Props = {};

const CreateColumn = (props: Props) => {
  const { displayBoard, setUpdated } = useContext(DataContext);

  const title = displayBoard?.title;
  const columns = displayBoard?.columns;
  const id = displayBoard?.id;
  const [boardName, setBoardName] = useState<string>(title);
  useEffect(() => {
    setBoardName(title);
  }, [setBoardName, title]);

  const [oldBoardColumns, setOldBoardColumns] = useState<string[]>(() => {
    if (columns) {
      return columns.map((column: ColumnsType) => column.title);
    } else {
      return [];
    }
  });
  const [localUpdatedState, setLocalUpdatedState] = useState<boolean>(false);

  const [newBoardColumns, setNewBoardColumns] = useState(["Add A New Column"]);

  const [deleteColumnIdHolder, setDeleteColumnIdHolder] = useState<string[]>(
    []
  );

  const boardNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (localUpdatedState === true && oldBoardColumns.length > 0) {
        const res = columns.map((column: any, index: number) => {
          const editOldColumns = async () => {
            const data = {
              title: oldBoardColumns[index],
            };
            const res = await axios
              .put(`/api/createBoard/${id}/${column.id}`, { ...data })
              .then((res) => res)
              .finally(() => setUpdated(true));
          };
          editOldColumns();
        });
      }
      if (newBoardColumns.length > 0 || boardName !== title) {
        const data = {
          title: boardName === "" ? title : boardName,
          columns: newBoardColumns.map((title) => title),
        };
        const res = await axios
          .put(`/api/createBoard/${id}`, {
            ...data,
            ...data.columns,
          })
          .then((res) => res)
          .finally(() => setUpdated(true));
      }
      if (deleteColumnIdHolder.length > 0) {
        const deleteFunction = async (boardId: string, columnId: string) => {
          const res = await axios
            .delete(`/api/createBoard/${boardId}/${columnId}`)
            .then((res) => res)
            .finally(() => {
              setUpdated(true), setNewBoardColumns(["Add A New Column"]);
            });
        };
        deleteColumnIdHolder.map((id: string) => {
          deleteFunction(displayBoard.id, id);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full">
        <h3>Add Columns</h3>
      </DialogTrigger>
      <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full">
        <DialogHeader>
          <DialogTitle className="text-start">Edit Board</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={onSubmitHandler}
        >
          {columns.length <= 0 ? (
            <div className="w-full flex flex-col gap-3">
              <BoardTitleInput
                boardName={boardName}
                setBoardName={setBoardName}
              />
              <p className="text-[0.75rem] font-[700]">Board Columns</p>
              <NoCurrentColumns
                newBoardColumns={newBoardColumns}
                setNewBoardColumns={setNewBoardColumns}
              />

              <EditColumnSubmitButton
                newBoardColumns={newBoardColumns}
                oldBoardColumns={oldBoardColumns}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full">
                <BoardTitleInput
                  boardName={boardName}
                  setBoardName={setBoardName}
                />
              </div>
              <HasColumns
                newBoardColumns={newBoardColumns}
                setNewBoardColumns={setNewBoardColumns}
                columns={columns}
                setOldBoardColumns={setOldBoardColumns}
                deleteColumnIdHolder={deleteColumnIdHolder}
                setDeleteColumnIdHolder={setDeleteColumnIdHolder}
                localUpdatedState={localUpdatedState}
                setLocalUpdatedState={setLocalUpdatedState}
              />
              <EditColumnSubmitButton
                newBoardColumns={newBoardColumns}
                oldBoardColumns={oldBoardColumns}
              />
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
