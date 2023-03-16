import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { titleChanged, taskDeleted, completeTask, getTasks, loadTasks, getTasksLoadingStatus, createTask } from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getErrors } from "./store/errors";

const store = configureStore();

const App = () => {
	const dispatch = useDispatch();
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
	const error = useSelector(getErrors())

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
	const addedTask = () => {
		dispatch(createTask())
	}
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
	if (error) {
		return <p>{error}</p>
	}
  return (
    <>
      <h1>App</h1>
			<button onClick={addedTask}>Add task</button>
      <ul>
        {state.map((i) => {
          return (
            <li key={i.id}>
              <p>{i.title}</p>
              <p>{`Completed: ${i.completed}`}</p>
              <button onClick={() => dispatch(completeTask(i.id))}>
                Complete task
              </button>
              <button onClick={() => changeTitle(i.id)}>Change title</button>
              <button onClick={() => deleteTask(i.id)}>Delete task</button>
              <hr />
            </li>
          );
        })}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
