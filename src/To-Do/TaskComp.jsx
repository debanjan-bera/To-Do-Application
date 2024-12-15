import "./todo.css";
import PropTypes from 'prop-types'
export const TaskListComp = ({index,data,onDeleteTask}) => {
  return (
    <li key={index} className="my-2">
      <span>{data}</span>
      <button
        className="h-8 p-2 bg-red-600 text-center"
        onClick={() => onDeleteTask(data)}>
        Delete
      </button>
    </li>
  );
};
TaskListComp.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired
}
