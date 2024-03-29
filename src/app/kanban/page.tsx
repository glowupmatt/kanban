"use client";
import React, { useEffect, useRef, useContext, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import useFetchBoardData from "@/components/kanbanBoard/kanbanHooks/useFetchBoardData";
import NavBody from "@/components/kanbanBoard/NavBody";
import VisibilityButton from "@/components/sideBarComps/VisibilityButton";
import SideBarContainer from "@/components/sideBarComps/SideBarContainer";
import { Draggable } from "@/components/DragableFile";
import { DataContext } from "@/context/AppContext";

type Props = {};

const KanbanPage = (props: Props) => {
  const { boardOpen } = useContext(DataContext);
  const boardRef = useRef(null);
  const session = useSession();
  const router = useRouter();
  useFetchBoardData();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="md:flex md:w-full flex-row-reverse md:h-screen overflow-screen w-full max-w-[200.25rem] md:items-center md:justify-start md:overflow-hidden relative">
      <div
        className={classNames(
          "h-screen justify-between items-center flex flex-col w-full relative bg-grey-light dark:bg-black-dark md:h-full md:w-full overflow-scroll",
        )}
      >
        <NavBody />

        <Draggable innerRef={boardRef} rootClass={"drag"}>
          <div
            className={classNames(
              "h-full flex justify-center items-center w-full overflow-scroll md:h-full md:relative",
              {
                "blur-md md:blur-none": boardOpen,
              },
            )}
          >
            <ColumnList />
          </div>
        </Draggable>
      </div>
      <VisibilityButton />
      <SideBarContainer />
    </div>
  );
};

export default KanbanPage;
