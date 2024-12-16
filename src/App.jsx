import "./App.css";
import { TodoApp } from "./To-Do/ToDoApp";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <section className="bg-red-500 h-lvh w-lvw  flex flex-col items-center backGroundImg">
        <TodoApp />
      </section>
    </>
  );
}

export default App;
