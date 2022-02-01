import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import uniqid from "uniqid";
import Modal from "react-modal";
import DisplayTodos from "./Components/DisplayTodos";

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
            <button onClick={openModal}>Add item to Todo List</button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <button onClick={closeModal}>Close</button>
                <form onSubmit={onSubmitTodo}>
                    <label htmlFor="title">Title:</label>
                    <input onChange={handleTitleChange}></input>
                    <label htmlFor="description">Description:</label>
                    <input onChange={handleDescriptionChange}></input>
                    <label htmlFor="priority"></label>
                    <select onChange={handlePriorityChange}>
                        <option value={"LOW"}>LOW</option>
                        <option value={"MEDIUM"}>MEDIUM</option>
                        <option value={"HIGH"}>HIGH</option>
                    </select>
                    <button type="submit">
                        <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                </form>
            </Modal>

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

            <Footer />
        </div>
    );
};

export default App;
