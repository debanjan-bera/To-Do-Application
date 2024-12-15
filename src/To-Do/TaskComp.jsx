import "./todo.css";
export const TaskListComp = ({index,data,onDeleteTask}) => {
  return (
    <li key={index}>
      <span>{data}</span>
      <button
        className="h-8 p-2 bg-red-600 text-center"
        onClick={() => onDeleteTask(data)}>
        Delete
      </button>
    </li>
  );
};
