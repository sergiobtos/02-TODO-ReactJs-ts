import styles from './Todo.module.css';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PlusCircle, ClipboardText } from 'phosphor-react'
import Task from '../Task/Task';


function Todo() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewTask(e.target.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      handleCreateTask(e);
    }
  };

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault()
    if (newTask.length > 0) {
      setTasks([...tasks, newTask])
      setNewTask('')
    }
  }

  const handleDeleteTask = (taskToBeDeleted: string) => {
    const taskWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToBeDeleted
    })
    setTasks(taskWithoutDeletedOne)
  }

  useEffect(() => {
    const result = JSON.parse(localStorage?.getItem('tasks') as string)
    if (tasks.length <= 0 && result) {
      setTasks([...tasks, ...result]);
    }
  }, []);

  useEffect(() => {
    if (tasks?.length > 0) {
      localStorage.removeItem('tasks')
      const jsonState = JSON.stringify(tasks);
      localStorage.setItem('tasks', jsonState);
    }
  }, [tasks]);

  return (
    <div id="todo" className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.container}>
          <input
            name="taskCommentInput"
            type="text"
            autoComplete="off"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleNewTaskChange} onKeyDown={handleKeyDown} />
          <button type="button" onClick={handleCreateTask}>
            Create
            <PlusCircle />
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.subTitle}>
              <p>Created Tasks</p>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.subTitle}>
              <p>Completed</p>
              <span>2 de 5</span>
            </div>
          </div>
          {tasks.length > 0 ? (
              <div className={styles.tasksContainer}>
                {tasks.map((task) => (
                  <Task task={task} onDeleteTask={handleDeleteTask} />
                ))}
              </div>
          ) : (
            <div className={styles.taskContainer}>
              <ClipboardText width={56} height={56} />
              <p>You do not have any tasks added yet</p>
              <p>Create tasks and organize your things to do</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Todo
