import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
  selectedBoardId: any;
  setSelectedBoardId: React.Dispatch<React.SetStateAction<any>>;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBoardToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmationModal = (props: Props) => {
  const {
    selectedBoardId,
    setSelectedBoardId,
    setUpdated,
    setEditBoardToggle,
  } = props;
  const deleteBoard = async () => {
    try {
      const res = await axios
        .delete(`/api/createBoard/${selectedBoardId}`)
        .then((res) => {
          res;
        })
        .finally(() => {
          setSelectedBoardId({} as any);
          setUpdated(true);
          setEditBoardToggle(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-red-main hover:text-red-hover">
        Delete Board
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this board?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the{" "}
            <span className="text-red-main font-bold">
              {selectedBoardId?.title}
            </span>{" "}
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <DialogClose onClick={deleteBoard} className="flex flex-col gap-4">
            <Button className="bg-red-main hover:bg-red-hover text-white rounded-full w-full">
              Delete Board
            </Button>
          </DialogClose>
          <DialogClose className="flex flex-col gap-4">
            <Button
              onClick={() => setEditBoardToggle(false)}
              className="bg-grey-light text-purple-main hover:bg-purple-hover rounded-full w-full"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
