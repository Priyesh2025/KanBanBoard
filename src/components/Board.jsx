import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import tasks from "../tasklist.json"; // Import the static tasks

export default function Board() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/todos")
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setCompleted(json.filter((task) => task.completed));
    //             setIncomplete(json.filter((task) => !task.completed));
    //         });
    // }, []);

    useEffect(() => {
        // Filter the data into completed and incomplete tasks
        setCompleted(tasks.filter((task) => task.completed));
        setIncomplete(tasks.filter((task) => !task.completed));
    }, []); // Only runs once on component mount


    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task);

    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }

    }
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, completed: true };
                setCompleted([updatedTask, ...completed]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, completed: false };
                setInReview([updatedTask, ...inReview]);
                break;
            case "4":  // BACKLOG
                updatedTask = { ...task, completed: false };
                setBacklog([updatedTask, ...backlog]);
                break;
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }




    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{
                textAlign: "center",
                color: "white",
                fontSize: "30px",

            }}>PROGRESS BOARD</h2>

            {/*<div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems:"center" }}>*/}
            {/*    <input*/}
            {/*        style={{*/}
            {/*            color: "#333",*/}
            {/*            backgroundColor: "#f5f5f5",*/}
            {/*            border: "1px solid #ccc",*/}
            {/*            borderRadius: "8px",*/}
            {/*            padding: "12px 16px",*/}
            {/*            fontSize: "15px",*/}
            {/*            minHeight: "120px",*/}
            {/*            marginBottom: "2px",  // Ensures space below the input field*/}
            {/*            width: "20%",*/}
            {/*            boxSizing: "border-box",*/}
            {/*            transition: "border-color 0.3s ease",*/}
            {/*        }}*/}
            {/*        type="text"*/}
            {/*        id="name"*/}
            {/*        name="name"*/}
            {/*        placeholder="Enter Task"*/}
            {/*        onFocus={(e) => e.target.style.borderColor = '#4A90E2'}*/}
            {/*        onBlur={(e) => e.target.style.borderColor = '#ccc'}*/}
            {/*    />*/}



            {/*    <button*/}
            {/*        style={{*/}
            {/*            backgroundColor: "#4A90E2",  // Blue color*/}
            {/*            color: "#fff",                // White text*/}
            {/*            border: "none",               // Remove default border*/}
            {/*            borderRadius: "8px",          // Rounded corners*/}
            {/*            padding: "12px 16px",         // Same padding as input*/}
            {/*            fontSize: "16px",             // Same font size for consistency*/}
            {/*            cursor: "pointer",           // Show pointer cursor on hover*/}
            {/*            transition: "background-color 0.3s ease", // Smooth hover effect*/}
            {/*            marginTop: "2px",            // Adds space between input and button*/}
            {/*            marginBottom: "20px",       // Adds space below the button*/}
            {/*            width: "20%",                // Full width button*/}
            {/*        }}*/}
            {/*        type="submit"*/}
            {/*        onMouseEnter={(e) => e.target.style.backgroundColor = '#357ABD'}  // Darker blue on hover*/}
            {/*        onMouseLeave={(e) => e.target.style.backgroundColor = '#4A90E2'}  // Reset to original blue*/}
            {/*    >*/}
            {/*        Submit*/}
            {/*    </button>*/}




            {/*</div>*/}


            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1300px",
                    margin: "0 auto"
                }}
            >
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"DONE"} tasks={completed} id={"2"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
                <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
            </div>
        </DragDropContext>
    );
}