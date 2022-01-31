import React from "react";

const DisplayTodos = ({ todos }) => {
    //Never forget to wrap your props in {} so that React doesn't transform them to objects for some reason
    return (
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
    );
};

export default DisplayTodos;
