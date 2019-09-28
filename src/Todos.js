import React, { createContext, useContext, useReducer } from "react";

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
        case "delete":
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

const Context = createContext();

function Todos() {
    const [state, dispatch] = useReducer(appReducer, []);
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
            <input type="checkbox" checked={completed} />
            <input type="text" defaultValue={text} />
            <button onClick={() => dispatch({ type: "delete", payload: id })}>
                Delete
            </button>
        </div>
    );
}

export default Todos;
