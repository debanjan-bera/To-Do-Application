import "./todo.css";
import PropTypes from 'prop-types'
export const TaskListComp = ({data,onDeleteTask}) => {
  return (
    <li className="p-2 my-2 bg-black/40  text-white text-xl font-medium flex flex-row justify-between items-center">
      <span>{data}</span>
      <button
        className="h-full p-2 bg-red-600 text-center"
        onClick={() => onDeleteTask(data)}>
        Delete
      </button>
    </li>
  );
};
TaskListComp.propTypes = {
  data: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired
}
