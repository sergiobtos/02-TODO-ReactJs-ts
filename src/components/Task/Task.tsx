import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Trash from '../../assets/Trash';
import CheckMark from '../../assets/CheckMark';
import styles from './Task.module.css';
import { ITask } from '../Todo/Todo';
import BarcodeScannerComponent from "react-qr-barcode-scanner";


export interface TaskProps {
  task: ITask;
  onDeleteTask: (task: ITask) => void;
  onCompleted: (id: string, isCompleted: boolean) => void;
}


function Task({ task, onDeleteTask, onCompleted }: TaskProps) {

  const handleIsDone = () => {
    onCompleted(task?.id, !task?.isComplete)
  }

  function handleDeleteTask() {
    onDeleteTask(task)
  }

   const handleUpdate = (err: any, result: any) => {
    if (result) {
      console.log(result)
    }
  };


  return (
    <div id="task" className={styles.wrapper}>
     {/*  <div className={`${styles.content} ${!task?.isComplete ? styles.hideCheckMark : styles.showCheckMark} `}>
        <div><span className={styles.circle} onClick={handleIsDone}><CheckMark /></span></div>
        <p>{task?.content}</p>
        <button onClick={handleDeleteTask}><Trash /></button>
      </div> */}
     <BarcodeScannerComponent onUpdate={handleUpdate} />
    </div>
  )
}

export default Task
