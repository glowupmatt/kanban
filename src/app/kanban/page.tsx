"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classNames";
import Nav from "@/components/kanbanBoard/Nav";
import ColumnList from "@/components/kanbanBoard/ColumnList";
import BoardMenu from "@/components/kanbanBoard/BoardMenu";

type Props = {};

const KanbanPage = (props: Props) => {
  const [boardOpen, setBoardOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div
      className={classNames(
        "h-screen justify-between items-center flex flex-col w-full relative"
      )}
    >
      <div className={classNames("h-[5rem] w-full")}>
        <Nav setBoardOpen={setBoardOpen} />
      </div>
      <div className="absolute top-[5rem] z-10">
        {!boardOpen ? null : <BoardMenu setBoardOpen={setBoardOpen} />}
      </div>
      <div
        className={classNames("h-screen flex justify-center items-center", {
          "blur-md": boardOpen,
        })}
      >
        <ColumnList />
      </div>
    </div>
  );
};

export default KanbanPage;
