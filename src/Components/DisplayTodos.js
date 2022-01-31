import React from "react";

const DisplayTodos = ({ todos, emptyTodoList, deleteTodo }) => {
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
                            <button>
                                <i
                                    className="fa fa-check-square"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <button onClick={() => deleteTodo(todo)}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default DisplayTodos;
