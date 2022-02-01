import React, { useState } from "react";

const DisplayTodos = ({
    todos,
    emptyTodoList,
    deleteTodo,
    toggleComplete,
    toggleEdit,
    newTodo,
    setTodos,
    findTodoIndex,
}) => {
    //Never forget to wrap your props in {} so that React doesn't transform them to objects for some reason
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState("LOW");

    const handleEditedTitleChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleEditedDescriptionChange = (e) => {
        setEditDescription(e.target.value);
    };

    const handleEditedPriorityChange = (e) => {
        setEditPriority(e.target.value);
    };

    const editTodo = (todo) => {
        let todoIndex = findTodoIndex(todo);
        let newTodoList = [...todos];
        if (editTitle === "" || editDescription === "") {
            alert("Fields can't be empty");
            return;
        }
        newTodo.title = editTitle;
        newTodo.description = editDescription;
        if (editPriority === "HIGH" || editPriority === "MEDIUM") {
            newTodo.priority = editPriority;
        } else {
            newTodo.priority = "LOW";
        }
        newTodoList[todoIndex] = newTodo;
        setTodos(newTodoList);
        setEditDescription("");
        setEditDescription("");
        setEditPriority("LOW");
        todo.edit = false;
    };

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
                            <button onClick={() => toggleEdit(todo)}>
                                <i className="fas fa-edit"></i>
                            </button>

                            <button onClick={() => deleteTodo(todo)}>
                                <i
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            {todo.edit === true && (
                                <div>
                                    <label htmlFor="title">New Title:</label>
                                    <input
                                        onChange={handleEditedTitleChange}
                                    ></input>
                                    <label htmlFor="description">
                                        New description:
                                    </label>
                                    <input
                                        onChange={handleEditedDescriptionChange}
                                    ></input>
                                    <label htmlFor="priority"></label>
                                    <select
                                        onChange={handleEditedPriorityChange}
                                    >
                                        <option value={"LOW"}>LOW</option>
                                        <option value={"MEDIUM"}>MEDIUM</option>
                                        <option value={"HIGH"}>HIGH</option>
                                    </select>
                                    <button onClick={() => editTodo(todo)}>
                                        Edit Todo
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayTodos;
