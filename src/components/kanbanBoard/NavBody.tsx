"use client";
import React, { useContext, useState } from "react";
import Nav from "./Nav";
import BoardMenu from "./BoardMenu";
import EditBoardModal from "./editBoard/EditBoardModal";
import classNames from "classnames";
import { DataContext } from "@/context/AppContext";

type Props = {};

const NavBody = (props: Props) => {
  const { boardOpen } = useContext(DataContext);
  //Sets edit board modal open/close
  const [editBoardToggle, setEditBoardToggle] = useState(false);
  return (
    <div className="w-full flex justify-center items-center">
      <div className={classNames("w-full flex")}>
        <Nav setEditBoardToggle={setEditBoardToggle} />
      </div>
      {!boardOpen ? null : <BoardMenu />}
      {!editBoardToggle ? null : (
        <EditBoardModal setEditBoardToggle={setEditBoardToggle} />
      )}
    </div>
  );
};

export default NavBody;
