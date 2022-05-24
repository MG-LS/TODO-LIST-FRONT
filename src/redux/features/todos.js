const initialState = {
  todos: [],
  error: null,
  load: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "todo/fetch/fulfilled":
      return {
        ...state,
        todos: action.payload,
        load: false,
      };
    case "todo/fetch/rejected":
      return {
        ...state,
        error: action.error,
        load: false,
      };
    case "todo/fetch/pending":
      return {
        ...state,
        load: true,
      };
    case "todo/fetch/add/fulfilled":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        load: false,
      };
    case "todo/fetch/add/rejected":
      return {
        ...state,
        error: action.error,
        load: false,
      };
    case "todo/fetch/add/pending":
      return {
        ...state,
        load: true,
      };
    case "todo/fetch/delete/fulfilled": {
      return {
        ...state,
        todos: state.todos.filter((item) => item._id !== action.payload),
        load: false,
      };
    }
    case "todo/fetch/delete/rejected": {
      return {
        ...state,
        error: action.error,
        load: false,
      };
    }
    case "todo/fetch/delete/pending": {
      return {
        ...state,
        load: true,
      };
    }
    case "todo/fetch/change/fulfilled": {
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item._id === action.payload){
            
             item.condition = !item.condition
             
             return item
            }
          return item;
        }),
        load: false,
      };
    }
    case "todo/fetch/change/rejected": {
      return {
        ...state,
        error: action.error,
        load: false,
      };
    }
    case "todo/fetch/change/pending": {
      return {
        ...state,
        load: true,
      };
    }
    default:
      return state;
  }
};

export const patchFetch = (id, condition) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "todo/fetch/change/pending" });
      const patch_fetch = await fetch(
        `http://localhost:5000/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  condition:!condition }),
        }
      );
      const data = await patch_fetch.json();
      dispatch({ type: "todo/fetch/change/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "todo/fetch/change/rejected", error: e.toString() });
    }
  }

};

export const postFetch = (text) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "todo/fetch/add/pending" });
      const post = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, completed: false }),
      });
      const data = await post.json();
      dispatch({ type: "todo/fetch/add/fulfilled", payload: data });
    } catch (e) {
      dispatch({ type: "todo/fetch/add/rejected", error: e.toString() });
    }
  };
};

export const deleteFetch = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "todo/fetch/delete/pending" });
      const delete_fetch = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "todo/fetch/delete/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "todo/fetch/delete/rejected", error: e.toString() });
    }
  };
};

export const loadTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "todo/fetch/pending" });
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json();
      dispatch({ type: "todo/fetch/fulfilled", payload: data });
    } catch (e) {
      dispatch({ type: "todo/fetch/rejected", error: e.toString() });
    }
  };
};
