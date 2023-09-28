import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classNames";
import axios from "axios";

type Props = {
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
  editBoardToggle: boolean;
  selectedBoard: any;
  setSelectedBoard: React.Dispatch<React.SetStateAction<any>>;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditBoardModal = (props: Props) => {
  const {
    setEditBoardToggle,
    editBoardToggle,
    selectedBoard,
    setSelectedBoard,
    setUpdated,
  } = props;
  const deleteBoard = async () => {
    try {
      const res = await axios
        .delete(`/api/createBoard/${selectedBoard?.id}`)
        .then((res) => {
          res;
        })
        .finally(() => {
          setSelectedBoard({} as any);
          setUpdated(true);
        });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={classNames(
        "absolute top-[4rem] right-[1rem] z-10",
        {
          "opacity-100 transform transition duration-500 ease-in-out":
            editBoardToggle,
        },
        {
          "opacity-0 transform transition duration-500 ease-in-out":
            !editBoardToggle,
        }
      )}
    >
      <Card className=" min-h-[5.875rem] min-w-[12rem] bg-grey-light dark:bg-grey-dark rounded-lg">
        {!selectedBoard ? (
          <CardContent
            onClick={() => setEditBoardToggle(false)}
            className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-start pl-4"
          >
            <p className="text-grey-medium">Edit Board</p>
            <p className="text-red-main hover:text-red-hover">Delete Board</p>
          </CardContent>
        ) : (
          <CardContent
            onClick={() => setEditBoardToggle(false)}
            className="min-h-[6rem] p-0 w-full flex flex-col gap-4 justify-center items-start pl-4"
          >
            <p className="text-grey-medium">Edit Board</p>
            <p
              onClick={deleteBoard}
              className="text-red-main hover:text-red-hover"
            >
              Delete Board
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EditBoardModal;
