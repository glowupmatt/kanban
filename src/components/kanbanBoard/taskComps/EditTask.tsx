import React, { useState, useContext } from 'react'
import { DataContext } from "@/context/AppContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deepPurple } from "@mui/material/colors";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios from 'axios';
import { Button } from '@/components/ui/button';
  
type Props = {
    task: {
        id: string;
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        columnId: string;
        boardId: string;
        subTask: {
            id: string;
            title: string;
            completed: boolean;
            createdAt: string;
            updatedAt: string;
            taskId: string;
        }[];
    }
}

const EditTask = (props: Props) => {
    const { task } = props
    const { id, title, description, subTask, columnId, boardId } = task
    const { setUpdated } = useContext(DataContext);

    const deleteTaskCLick = async () => {
        try {
            await axios.delete(`/api/task/${id}`)
            setUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

  return (
<Dialog>
  <DialogTrigger>
    <MoreVertIcon sx={{ color: deepPurple[`A100`] }} />
  </DialogTrigger>
  <DialogContent>
   <Button onClick={deleteTaskCLick}>Delete Task</Button>
  </DialogContent>
</Dialog>

  )
}

export default EditTask