import React, { useState } from "react";

const DisplayTodos = ({ todos, emptyTodoList, deleteTodo, toggleComplete }) => {
    //Never forget to wrap your props in {} so that React doesn't transform them to objects for some reason

    return (
        <div>
            <button onClick={emptyTodoList}>Empty Todo List</button>
            <div>
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <div
                                style={{
                                    textDecorationLine:
                                        todo.completed === true
                                            ? "line-through"
                                            : "none",
                                    textDecorationStyle:
                                        todo.completed === true
                                            ? "solid"
                                            : "none",
                                }}
                            >
                                {todo.title}
                            </div>
                            <div
                                style={{
                                    textDecorationLine:
                                        todo.completed === true
                                            ? "line-through"
                                            : "none",
                                    textDecorationStyle:
                                        todo.completed === true
                                            ? "solid"
                                            : "none",
                                }}
                            >
                                {todo.description}
                            </div>
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
            </div>
        </div>
    );
};

export default DisplayTodos;
