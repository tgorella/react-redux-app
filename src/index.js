import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import { taskCompleted } from "./store/actions";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };
	const deleteTask = (taskId) => {
		store.dispatch(actions.taskDeleted(taskId));
	}
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((i) => {
          return (
            <li key={i.id}>
              <p>{i.title}</p>
              <p>{`Completed: ${i.completed}`}</p>
              <button onClick={() => completeTask(i.id)}>Complete task</button>
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
    <App />
  </React.StrictMode>
);
