"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classNames";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import axios from "axios";
import NavBody from "@/components/kanbanBoard/NavBody";
import { BoardDataType } from "@/types/boardData";
import VisibilityButton from "@/components/sideBarComps/VisibilityButton";
import SideBarContainer from "@/components/sideBarComps/SideBarContainer";
import { Draggable } from "@/components/DragableFile";

type Props = {};

const KanbanPage = (props: Props) => {
  const boardRef = useRef(null);
  //Sets board menu open/close
  const [boardOpen, setBoardOpen] = useState<boolean>(false);
  //Redirection to login page if user is not authenticated
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);
  //Board data
  const [boardData, setBoardData] = useState<BoardDataType[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");
  const [updated, setUpdated] = useState<boolean>(true);
  const [displayBoard, setDisplayBoard] = useState<BoardDataType[]>([
    {
      id: "",
      title: "",
      createdAt: "",
      updatedAt: "",
      userId: "",
      columns: [
        {
          id: "",
          title: "",
          createdAt: "",
          UpdatedAt: "",
          userId: "",
          boardId: "",
        },
      ],
    },
  ]);

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

  //Sets the selected board data to be displayed
  useEffect(() => {
    setDisplayBoard(() => {
      const filteredBoardData = boardData.filter(
        (board) => board.id === selectedBoardId
      );
      return filteredBoardData;
    });
  }, [boardData, selectedBoardId]);

  console.log(displayBoard, "displayBoard");

  return (
    <div className="md:flex md:w-full flex-row-reverse md:h-screen overflow-screen w-full max-w-[200.25rem] md:items-center md:justify-start md:overflow-hidden relative">
      {/*Main Body Container*/}
      <div
        className={classNames(
          "h-screen justify-between items-center flex flex-col w-full relative bg-grey-light dark:bg-black-dark md:h-full",
          { "md:w-full overflow-scroll": !boardOpen },
          { "md:w-full lg:w-full": boardOpen }
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
        <Draggable innerRef={boardRef} rootClass={"drag"}>
          <div
            className={classNames(
              "h-full flex justify-center items-center w-full overflow-scroll md:h-full md:relative",
              {
                "blur-md md:blur-none": boardOpen,
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
        </Draggable>
        {/* Column List & Task List*/}
      </div>
      {/*Button to open & close desktop nav view*/}
      <VisibilityButton boardOpen={boardOpen} setBoardOpen={setBoardOpen} />
      {/*Side Nav For Desktop*/}
      <SideBarContainer
        boardOpen={boardOpen}
        setBoardOpen={setBoardOpen}
        boardData={boardData}
        setSelectedBoardId={setSelectedBoardId}
        selectedBoardId={selectedBoardId}
        setUpdated={setUpdated}
      />
    </div>
  );
};

export default KanbanPage;
