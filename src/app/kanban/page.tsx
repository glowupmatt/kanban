"use client";
import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classNames";
import Nav from "@/components/kanbanBoard/Nav";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import BoardMenu from "@/components/kanbanBoard/BoardMenu";
import axios from "axios";
import CreateColumn from "@/components/kanbanBoard/CreateColumn";
import EditBoardModal from "@/components/kanbanBoard/editBoard/EditBoardModal";

type Props = {};

const KanbanPage = (props: Props) => {
  const [boardOpen, setBoardOpen] = useState(false);
  const [editBoardToggle, setEditBoardToggle] = useState(false);
  const session = useSession();
  const router = useRouter();

  //Redirection to login page if user is not authenticated
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);
  //Board data
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({} as any);
  const [updated, setUpdated] = useState(true);
  useEffect(() => {
    const getBoardData = async () => {
      const res = await axios
        .get("/api/createBoard")
        .then((res) => {
          setBoardData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return res;
    };

    if (updated) {
      getBoardData().finally(() => setUpdated(false));
    }
  }, [updated]);

  console.log(selectedBoard);
  console.log(boardData);
  return (
    <div
      className={classNames(
        "h-screen justify-between items-center flex flex-col w-full relative bg-grey-light dark:bg-black-dark"
      )}
    >
      <div className={classNames("w-full")}>
        <Nav
          setBoardOpen={setBoardOpen}
          boardOpen={boardOpen}
          selectedBoard={selectedBoard}
          editBoardToggle={editBoardToggle}
          setEditBoardToggle={setEditBoardToggle}
        />
      </div>
      {!boardOpen ? null : (
        <BoardMenu
          setBoardOpen={setBoardOpen}
          boardData={boardData}
          setSelectedBoard={setSelectedBoard}
          selectedBoard={selectedBoard}
        />
      )}
      {!editBoardToggle ? null : (
        <EditBoardModal
          setEditBoardToggle={setEditBoardToggle}
          editBoardToggle={editBoardToggle}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          setUpdated={setUpdated}
        />
      )}
      <div
        className={classNames(
          "h-full flex justify-center items-center w-full overflow-scroll",
          {
            "blur-md": boardOpen,
          }
        )}
      >
        <ColumnList selectedBoard={selectedBoard} />
      </div>
    </div>
  );
};

export default KanbanPage;
