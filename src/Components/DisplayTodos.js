import React, { useState } from "react";

const DisplayTodos = ({ todos, emptyTodoList, deleteTodo, toggleComplete }) => {
    //Never forget to wrap your props in {} so that React doesn't transform them to objects for some reason
    console.log(todos); 
    return (
        <div>
            <button onClick={emptyTodoList}>Empty Todo List</button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <li>{todo.title}</li>
                            <div>{todo.description}</div>
                            <div>{todo.priority}</div>
                            <button onClick={() => toggleComplete(todo)}>
                                <i
                                    className="fa fa-check-square"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <button>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => deleteTodo(todo)}>
                                <i
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default DisplayTodos;
