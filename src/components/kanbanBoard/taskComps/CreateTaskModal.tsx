"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deepPurple, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@/components/ui/input";

type Props = {};

const CreateTaskModal = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="p-4 bg-purple-main max-w-[3rem] max-h-[2rem] flex justify-center items-center rounded-full hover:bg-purple-hover md:max-w-[10.25rem] md:max-h-[3rem]">
          <AddIcon sx={{ color: grey[50] }} />
          <p className="font-[700] hidden md:block text-white">Add New Task</p>
        </DialogTrigger>
        <DialogContent className="dark:bg-grey-darkest p-4 rounded-md max-w-[21.4375rem] overflow-scroll max-h-full">
          <DialogHeader>
            <DialogTitle className="text-start">Add New Task</DialogTitle>
            <form>
              <label htmlFor="title">Title</label>
              <Input id="title" />
              <Input />
              <Input />
              <Input />
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskModal;
