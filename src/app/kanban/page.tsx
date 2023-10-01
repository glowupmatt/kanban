"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classNames";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import axios from "axios";
import NavBody from "@/components/kanbanBoard/NavBody";
import { BoardDataType } from "@/types/boardData";
import SideBar from "@/components/kanbanBoard/SideBar";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@/components/ui/button";

type Props = {};

const KanbanPage = (props: Props) => {
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
    <div className="md:flex flex-row-reverse md:h-screen overflow-screen">
      {/*Main Body Container*/}
      <div
        className={classNames(
          "h-screen justify-between items-center flex flex-col w-full relative bg-grey-light dark:bg-black-dark md:h-full"
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
          {/* prettier-ignore */}
          <div className={classNames("absolute bottom-[2rem] left-0 ", { "hidden md:hidden": !boardOpen },{"hidden md:block" : boardOpen})}>
            <div
              className="relative rounded-r-full bg-purple-main h-[3rem] w-[3.5rem] flex justify-center items-center hover:bg-purple-hover cursor-pointer"
              onClick={() => setBoardOpen((prev) => !prev)}
            >
              <VisibilityIcon className="text-white" />
            </div>
          </div>
        </div>
        {/* Column List & Task List*/}
      </div>
      <div
        className={classNames(
          "h-full border-r-solid border-r-2 dark:border-r-grey-dark dark:bg-grey-darkest min-w-[16.25rem] bg-white",
          //prettier-ignore
          {
      "md:hidden hidden": boardOpen,
    },
          {
            "hidden md:block": !boardOpen,
          }
        )}
      >
        <div className={classNames("flex flex-col gap-[3.3rem] h-full")}>
          <div className="w-full flex justify-center p-[1rem] min-h-[4.4rem]">
            <Image
              src="/KanbanFiles/kanabDesktopLogo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="min-w-[9.533rem] min-h-[1.5765rem] hidden dark:block"
            />
            <Image
              src="/KanbanFiles/lightModeKanbanLogo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="min-w-[9.533rem] min-h-[1.5765rem] hidden md:block dark:hidden"
            />
          </div>
          <div className={classNames("w-full h-full hidden md:block")}>
            <SideBar
              setBoardOpen={setBoardOpen}
              boardData={boardData}
              setSelectedBoardId={setSelectedBoardId}
              selectedBoardId={selectedBoardId}
              setUpdated={setUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanPage;
