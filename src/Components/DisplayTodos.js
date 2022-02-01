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

    //I cloned these functions as a momentary tool to edit the state of the todo I wanted to edit, as using the functions on App.js didn't work for some reason
    //This is this code's weakest point, there's room for improvement
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
        newTodo.title = editTitle === "" ? todo.title : editTitle;
        newTodo.description =
            editDescription === "" ? todo.description : editDescription;
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
        <div className="todo-main-container">
            <button onClick={emptyTodoList} className="empty-todo-button">
                <i className="fa fa-trash-o" />
                Empty Todo List
            </button>
            <div className="todo-container">
                {todos.map((todo) => {
                    return (
                        <div className="todo" key={todo.id}>
                            <div
                                className="todo-title"
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
                                className="todo-description"
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
                            <div className="todo-priority">{todo.priority}</div>
                            <div className="todo-button-container">
                                <button
                                    onClick={() => toggleComplete(todo)}
                                    className="action-button toggle-complete"
                                >
                                    <i className="fa fa-check-square" />
                                </button>
                                <button
                                    onClick={() => toggleEdit(todo)}
                                    className="action-button toggle-edit"
                                >
                                    <i className="fas fa-edit" />
                                </button>

                                <button
                                    onClick={() => deleteTodo(todo)}
                                    className="action-button delete-todo"
                                >
                                    <i className="fas fa-minus-circle" />
                                </button>
                            </div>

                            {todo.edit === true && (
                                <div className="edit-todo">
                                    <label htmlFor="title">New Title:</label>
                                    <input
                                        placeholder="Add a new title"
                                        onChange={handleEditedTitleChange}
                                    ></input>
                                    <label htmlFor="description">
                                        New description:
                                    </label>
                                    <input
                                        placeholder="Add a new description"
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
                                    <button
                                        onClick={() => editTodo(todo)}
                                        className="add-todo-button edit-todo-button"
                                    >
                                        <i className="fas fa-edit" />
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
