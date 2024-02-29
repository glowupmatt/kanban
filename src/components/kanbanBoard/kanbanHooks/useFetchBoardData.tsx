"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "@/context/AppContext";

const useFetchBoardData = () => {
  const { setBoardData, setUpdated, updated } = useContext(DataContext);

  useEffect(() => {
    const getBoardData = async () => {
      try {
        const res = await axios.get("/api/createBoard");
        setBoardData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setUpdated(false);
      }
    };

    if (updated) {
      getBoardData();
    }
  }, [updated, setBoardData, setUpdated]);
};

export default useFetchBoardData;
