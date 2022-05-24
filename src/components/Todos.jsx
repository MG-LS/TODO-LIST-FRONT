import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFetch,
  loadTodos,
  patchFetch,
  postFetch,
} from "../redux/features/todos";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Todos = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const load = useSelector((state) => state.load);

  const [todo, setTodo] = useState("");

  const addTodo = () => {
    dispatch(postFetch(todo));
  };

  const removeTodo = (id) => {
    dispatch(deleteFetch(id));
  };

  const booleanTodo = (id, condition) => {
    dispatch(patchFetch(id, condition));
  };

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div>
      <div className="todo">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => addTodo()}>Добавить</button>
      </div>
      <div>
        {load
          ? "... идет загрузка"
          : todos.map((item) => {
              return (
                <div key={item._id}>
                  <div className="list">
                    <Form>
                      <Form.Check
                      className="check"
                        type="switch"
                        id="custom-switch"
                        onChange={(e) => booleanTodo(item._id, item.condition)}
                        checked={item.condition}
                      />
                    
                    </Form>
                    
                    <div className="text_todo">{item.text}</div>
                    <button onClick={() => removeTodo(item._id)}>✘</button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Todos;
