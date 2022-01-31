import React from "react";

const DisplayTodos = ({ todos, emptyTodoList }) => {
    //Never forget to wrap your props in {} so that React doesn't transform them to objects for some reason
    return (
        <div>
            <button onClick={emptyTodoList}>Empty Todo List</button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <li>{todo.title}</li>
                            <div>{todo.description}</div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default DisplayTodos;
