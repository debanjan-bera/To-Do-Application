import "./todo.css";
import PropTypes from 'prop-types'
export const TaskListComp = ({data,onDeleteTask}) => {
  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString();
  return (
    <li className="px-3 py-3 my-2 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative">
      <span className="text-2xl mb-2">{data}</span>
      <div className="date absolute text-[0.7rem] bottom-[-0.29rem] left-0 px-3 text-white/50">{formattedDate}</div>
      <button
        className="h-full p-1 bg-red-600 text-center"
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
