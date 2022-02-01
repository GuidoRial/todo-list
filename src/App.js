import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import uniqid from "uniqid";
import Modal from "react-modal";
import DisplayTodos from "./Components/DisplayTodos";
import Header from "./Components/Header"

const App = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [todos, setTodos] = useState([
        {
            title: "Learn React",
            description: "Make a todo-list to test my knowledge",
            id: uniqid(),
            completed: false,
            priority: "MEDIUM",
            edit: false,
        },
        {
            title: "Give Guido a job as a front end developer",
            description: "I didn't write that, your mind did.",
            id: uniqid(),
            completed: false,
            priority: "HIGH",
            edit: false,
        },
        {
            title: "Make dinner",
            description: "Homemade pizza on a week-day, awesome",
            id: uniqid(),
            completed: false,
            priority: "LOW",
            edit: false,
        },
    ]);

    useEffect(() => {
        const data = localStorage.getItem("todos");
        if (data) {
            setTodos(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

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

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const onSubmitTodo = (e) => {
        e.preventDefault();
        if (title === "" || description === "") {
            alert("Fields can't be empty");
            return;
        }
        newTodo.title = title;
        newTodo.description = description;
        if (priority === "HIGH" || priority === "MEDIUM") {
            newTodo.priority = priority;
        } else {
            newTodo.priority = "LOW";
        }
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        setPriority("LOW");
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
        priority: "LOW",
        edit: false,
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

    const toggleComplete = (todo) => {
        let todoIndex = findTodoIndex(todo);
        let newTodoList = [...todos];
        if (newTodoList[todoIndex].completed === false) {
            newTodoList[todoIndex].completed = true;
        } else {
            newTodoList[todoIndex].completed = false;
        }
        setTodos(newTodoList);
    };

    const toggleEdit = (todo) => {
        let todoIndex = findTodoIndex(todo);
        let newTodoList = [...todos];
        if (newTodoList[todoIndex].edit === false) {
            newTodoList[todoIndex].edit = true;
        } else {
            newTodoList[todoIndex].edit = false;
        }
        setTodos(newTodoList);
    };

    const sortTodoArray = () => {
        todos.sort((a, b) => {
            const orders = { LOW: 2, MEDIUM: 1, HIGH: 0 };
            return orders[a.priority] - orders[b.priority];
        });
    };
    sortTodoArray();

    return (
        <div className="App">
            <Header/>
            <div className="main-container">
                <button onClick={openModal}>Add item to Todo List</button>
                <div className="modal-container">
                    <Modal
                        isOpen={modalIsOpen}
                        ariaHideApp={false}
                        className="modal"
                    >
                        <button
                            onClick={closeModal}
                            className="close-modal-button"
                        >
                            X
                        </button>
                        <form onSubmit={onSubmitTodo} className="add-todo-form">
                            <label htmlFor="title">Title:</label>
                            <input onChange={handleTitleChange}></input>
                            <label htmlFor="description">Description:</label>
                            <input onChange={handleDescriptionChange}></input>
                            <label htmlFor="priority"></label>
                            <div className="option-container">
                                <select onChange={handlePriorityChange}>
                                    <option value={"LOW"}>LOW</option>
                                    <option value={"MEDIUM"}>MEDIUM</option>
                                    <option value={"HIGH"}>HIGH</option>
                                </select>
                            </div>

                            <button type="submit" className="add-todo-button">Add new Todo</button>
                        </form>
                    </Modal>
                </div>

                <DisplayTodos
                    todos={todos}
                    emptyTodoList={emptyTodoList}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    toggleEdit={toggleEdit}
                    newTodo={newTodo}
                    setTodos={setTodos}
                    findTodoIndex={findTodoIndex}
                />
            </div>
            <Footer />
        </div>
    );
};

export default App;
