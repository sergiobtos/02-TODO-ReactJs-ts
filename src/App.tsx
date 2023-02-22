import { v4 as uuid4 } from 'uuid';
import { Hero, Todo } from './components';
import styles from './App.module.css';
import './global.css';

function App() {

  return (
    <>
      <Hero />
      <Todo />
    </>
  )
}

export default App
