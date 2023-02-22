import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Trash from '../../assets/Trash';
import CheckMark from '../../assets/CheckMark';
import styles from './Task.module.css';

export interface TaskProps {
  task: string;
  onDeleteTask: (task: string) => void;
}


function Task({ task, onDeleteTask }: TaskProps) {
  const [isDone, setIsDone] = useState(false);

  const handleIsDone = () => {
    setIsDone(!isDone);
  }

  function handleDeleteTask(){
    onDeleteTask(task)
  }

  return (
    <div id="task" className={styles.wrapper}>
      <div className={`${styles.content} ${!isDone ? styles.hideCheckMark : styles.showCheckMark} `}>
        <span className={styles.circle} onClick={handleIsDone}><CheckMark /></span>
        <p>{task}</p>
        <button onClick={handleDeleteTask}><Trash  /></button>
      </div>
    </div>
  )
}

export default Task
