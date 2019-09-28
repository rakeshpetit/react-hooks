import React, { createContext, useEffect, useContext, useReducer } from "react";

const appReducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: "",
                    completed: false
                }
            ];
        case "complete":
            return state.map(item => {
                return item.id === action.payload
                    ? { ...item, completed: !item.completed }
                    : item;
            });
        case "reset":
            return action.payload
        case "delete":
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

const Context = createContext();

function Todos() {
    const [state, dispatch] = useReducer(appReducer, []);
    useEffect(() => {
        localStorage.setItem("todoData", JSON.stringify(state));
    }, [state]);
    useEffect(() => {
        const data = localStorage.getItem("todoData");
        dispatch({ type: "reset", payload: JSON.parse(data) });
    }, []);
    return (
        <Context.Provider value={dispatch}>
            <div>
                <h1>Todo App</h1>
                <button onClick={() => dispatch({ type: "add" })}>
                    New todo
                </button>
                <TodoList items={state} />
            </div>
        </Context.Provider>
    );
}

function TodoList({ items }) {
    return items.map(item => <TodoItem key={item.id} {...item} />);
}

function TodoItem({ id, text, completed }) {
    const dispatch = useContext(Context);
    return (
        <div>
            <input
                onChange={() => dispatch({ type: "complete", payload: id })}
                type="checkbox"
                checked={completed}
            />
            <input type="text" defaultValue={text} />
            <button onClick={() => dispatch({ type: "delete", payload: id })}>
                Delete
            </button>
        </div>
    );
}

export default Todos;
