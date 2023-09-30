"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classNames";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import axios from "axios";
import NavBody from "@/components/kanbanBoard/NavBody";

type Props = {};

const KanbanPage = (props: Props) => {
  //Sets board menu open/close
  const [boardOpen, setBoardOpen] = useState(false);
  //Redirection to login page if user is not authenticated
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);
  //Board data
  const [boardData, setBoardData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [updated, setUpdated] = useState(true);

  //Gets board data from database & updates when board is updated
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

  const displayBoard = boardData.filter((board: any) => {
    return board.id === selectedBoardId;
  });

  console.log(displayBoard, "displayBoard");
  return (
    //Main Body Container
    <div
      className={classNames(
        "h-screen justify-between items-center flex flex-col w-full relative bg-grey-light dark:bg-black-dark"
      )}
    >
      {/* Nav Bar controls modal toggle with Menu and Edit Board*/}
      <NavBody
        setBoardOpen={setBoardOpen}
        boardOpen={boardOpen}
        selectedBoardId={selectedBoardId}
        updated={updated}
        setUpdated={setUpdated}
        boardData={boardData}
        setSelectedBoardId={setSelectedBoardId}
        displayBoard={displayBoard}
      />
      {/* Nav Bar controls modal toggle with Menu and Edit Board*/}

      {/* Column List & Task List*/}
      <div
        className={classNames(
          "h-full flex justify-center items-center w-full overflow-scroll",
          {
            "blur-md": boardOpen,
          }
        )}
      >
        <ColumnList
          setUpdated={setUpdated}
          selectedBoardId={selectedBoardId}
          boardData={boardData}
          displayBoard={displayBoard}
        />
      </div>
      {/* Column List & Task List*/}
    </div>
  );
};

export default KanbanPage;
