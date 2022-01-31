import React, { useState } from "react";
import "./App.css";
import uniqid from "uniqid";
import DisplayTodos from "./Components/DisplayTodos";

const App = () => {
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

    let newTodo = {
        title: "",
        description: "",
        id: uniqid(),
        completed: false,
    };

    const handleTitleChange = (e) => {
        newTodo.title = e.target.value;
    };

    const handleDescriptionChange = (e) => {
        newTodo.description = e.target.value;
    };
    const onSubmitTodo = (e) => {
        e.preventDefault();
        setTodos([...todos, newTodo]);
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
