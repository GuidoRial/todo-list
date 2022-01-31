import React, { useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import uniqid from "uniqid";
import Modal from "react-modal";
import DisplayTodos from "./Components/DisplayTodos";

const App = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
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

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
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

    const onSubmitTodo = (e) => {
        e.preventDefault();
        newTodo.title = title;
        newTodo.description = description;
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        handleReset();
        closeModal();
    };

    const emptyTodoList = () => {
        setTodos([]);
    };

    let newTodo = {
        title: "",
        description: "",
        id: uniqid(),
        completed: false,
    };

    const findTodoIndex = (task) => {
        const indexOfTodo = todos.findIndex((todo) => todo.id === task.id);
        return indexOfTodo;
    };

    const deleteTodo = (todo) => {
        let todoIndex = findTodoIndex(todo);
        let newTodoList = [...todos];
        newTodoList.splice(todoIndex, 1);
        setTodos(newTodoList);
    };

    return (
        <div className="App">
            <button onClick={openModal}>
                <i className="fa fa-plus-square" aria-hidden="true"></i>
            </button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <button onClick={closeModal}>Close</button>
                <form onSubmit={onSubmitTodo}>
                    <label htmlFor="title">Title:</label>
                    <input onChange={handleTitleChange}></input>
                    <label htmlFor="description">Description:</label>
                    <input onChange={handleDescriptionChange}></input>
                    <button type="submit">
                        <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                </form>
            </Modal>

            <DisplayTodos
                todos={todos}
                emptyTodoList={emptyTodoList}
                deleteTodo={deleteTodo}
            />

            <Footer />
        </div>
    );
};

export default App;
