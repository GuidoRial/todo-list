import React, { useState } from "react";
import "./App.css";
import uniqid from "uniqid";
import DisplayTodos from "./Components/DisplayTodos";

const App = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([
        {
            title: "Learn React",
            description: "Dedicate this day to learn React",
            id: uniqid(),
            completed: false,
        },
        {
            title: "Make dinner",
            description: "Pizza on a week day? crazy. I love it.",
            id: uniqid(),
            completed: true,
        },
    ]);

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
        );
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    let newTodo = {
        title: "",
        description: "",
        id: uniqid(),
        completed: false,
    };
    const onSubmitTodo = (e) => {
        e.preventDefault();
        newTodo.title = title;
        newTodo.description = description;
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        handleReset();
    };

    const emptyTodoList = () => {
        setTodos([]);
    };

    return (
        <div className="App">
            <form onSubmit={onSubmitTodo}>
                <label htmlFor="title">Title:</label>
                <input onChange={handleTitleChange}></input>
                <label htmlFor="description">Description:</label>
                <input onChange={handleDescriptionChange}></input>
                <button type="submit">Add todo</button>
            </form>

            <DisplayTodos todos={todos} emptyTodoList={emptyTodoList} />
        </div>
    );
};

export default App;
