import styles from './Todo.module.css';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { v4 as uuid } from 'uuid';
import Task from '../Task/Task';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export interface ITask {
  id: string;
  content: string;
  isComplete: boolean;
}

function Todo() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<ITask>();
  const [barcode, setBarCode] = useState();

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newTask: ITask = {
      id: uuid(),
      content: e.target.value,
      isComplete: false,
    }
    setNewTask(newTask)
  }

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      handleCreateTask(e);
    }
  };

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault()
    if (newTask && newTask?.content?.length > 0) {
      setTasks([...tasks, newTask])
      setNewTask({ ...newTask, content: '' })
    }
  }

  const handleCompleted = (id: string, isComplete: boolean) => {
    const updatedTasks = tasks.reduce((acc: ITask[], task: ITask) => {
      if (task.id === id) {
        const updatedTask: ITask = {
          ...task,
          isComplete: isComplete,
        };
        return [...acc, updatedTask];
      } else {
        return [...acc, task];
      }
    }, []);
    setTasks(updatedTasks);
  };


  const handleDeleteTask = (task: ITask) => {
    const updatedTasks = tasks.reduce((acc: ITask[], t: ITask) => {
      if (t.id !== task.id) {
        acc.push(t);
      }
      return acc;
    }, []);
    saveTaskToLocalStorage(updatedTasks)
    setTasks(updatedTasks);
  };

  const saveTaskToLocalStorage = (tasksToBeSaved: ITask[]) => {
    if (tasksToBeSaved?.length > 0) {
      localStorage.removeItem('tasks')
      const jsonState = JSON.stringify(tasksToBeSaved);
      localStorage.setItem('tasks', jsonState);
    }else{
      localStorage.removeItem('tasks')
    }
  }

  const getTasksFromLocalStorage = () => {
    const result = JSON.parse(localStorage?.getItem('tasks') as string)
    if (tasks.length <= 0 && result) {
      setTasks(result);
    }
  }

  useEffect(() => {
    getTasksFromLocalStorage()
  }, []);

  useEffect(() => {
    saveTaskToLocalStorage(tasks)
  }, [tasks]);

  const handleUpdate = (err: any, result: any) => {
     if (result) {
      setBarCode(result)
      console.log(result)
    }
  };

  return (
    <div id="todo" className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.container}>
          <input
            name="taskCommentInput"
            type="text"
            autoComplete="off"
            placeholder="Add a new task"
            value={newTask?.content}
            onChange={handleNewTaskChange} onKeyDown={handleKeyDown} />
          <button
            type="button"
            onClick={handleCreateTask}
            style={{ opacity: (newTask?.content?.length ?? 0) > 0 ? 1 : 0.5 }}
            disabled={!newTask || !newTask.content || newTask.content.length <= 0}>
            Create
            <PlusCircle />
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.subTitle}>
              <p>Created Tasks</p>
              <span>{tasks?.length}</span>
            </div>
            <div className={styles.subTitle}>
              <p>Completed</p>
              <span>{(tasks?.filter((task) => task?.isComplete === true)).length} de {tasks?.length}</span>
            </div>
          </div>
           <h1>Barcode: {barcode}</h1>
     <BarcodeScannerComponent  onUpdate={handleUpdate} />
          {/* {tasks.length > 0 ? (
            <div className={styles.tasksContainer}>
              {tasks.map((task) => (
                <Task key={task?.id} task={task} onDeleteTask={handleDeleteTask} onCompleted={handleCompleted} />
              ))}
            </div>
          ) : (
               <div className={styles.taskContainer}>
              <ClipboardText width={56} height={56} />
              <p>You do not have any tasks added yet</p>
                <p>Create tasks and organize your things to do</p>
              </div>
          )} */}
        </section>
      </div>
    </div>
  )
}

export default Todo
