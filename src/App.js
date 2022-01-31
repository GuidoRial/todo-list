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
            complete: false,
        },
        {
            title: "Make dinner",
            description: "Pizza on a week day? crazy. I love it.",
            id: uniqid(),
            complete: true,
        },
    ]);
    console.log(todos);

    return (
        <div className="App">
            <form>
                <label htmlFor="title">Title:</label>
                <input></input>
                <label htmlFor="description">Description:</label>
                <input></input>
                <button type="submit">Add todo</button>
            </form>

            <DisplayTodos todos={todos} />
        </div>
    );
};

export default App;
