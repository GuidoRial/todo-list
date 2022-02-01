import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import uniqid from "uniqid";
import Modal from "react-modal";
import DisplayTodos from "./Components/DisplayTodos";
import Header from "./Components/Header";

const App = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");

    //Set the initial tasks, notice how they're not ordered in any way
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
        //On load, get todos and convert them to an array, then set todos to that array
        const data = localStorage.getItem("todos");
        if (data) {
            setTodos(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        //Everytime todos changes, save those changes to local storage
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    //Modal related functions (To add a Todo)
    //Set the modal status (open or closed) to be reflected on isOpen, if it's true then open modal. Set a button to change that status.
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    //Modal related functions (To add a Todo)

    //Get every input, make an array from that node-list and for each one of those change it's value to an empty string
    //so that everytime the user submits something the input stays clean
    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
        );
    };

    //Functions to collect the task's data
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };
    //Functions to collect the task's data

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

    //Object that works as a momentary data storage.
    //The data I collected gets sent to this object and with onSubmitTodo that object gets added to todos(the array)
    //Then, on the same function, this objects return to this state
    let newTodo = {
        title: "",
        description: "",
        id: uniqid(),
        completed: false,
        priority: "LOW",
        edit: false,
    };

    //Returns the index of the task it's given (The task is a todo. I feed it the task on DisplayTodos.js)
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
        //I'm sure there's a better way to do this, but this works just fine
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

    //I could make something like
    /*
    const toggle = (todo, key) {
        let todoIndex = findTodoIndex(todo);
        let newTodoList = [...todos];
        //I'm sure there's a better way to do this, but this works just fine 
        if (newTodoList[todoIndex].key === false) {
            newTodoList[todoIndex].key = true;
        } else {
            newTodoList[todoIndex].key = false;
        }
        setTodos(newTodoList);
    }
    and save space
    */

    //Sort the array by prioirty with high on top so that it displays first
    const sortTodoArray = () => {
        todos.sort((a, b) => {
            const orders = { LOW: 2, MEDIUM: 1, HIGH: 0 };
            return orders[a.priority] - orders[b.priority];
        });
    };
    sortTodoArray();

    return (
        <div className="App">
            <Header />
            <div className="main-container">
                <button onClick={openModal} className="add-todo-button">
                    <i className="fas fa-plus" /> ADD NEW TODO
                </button>
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

                            <button type="submit" className="add-todo-button">
                                <i class="fas fa-plus" /> ADD NEW TODO
                            </button>
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
